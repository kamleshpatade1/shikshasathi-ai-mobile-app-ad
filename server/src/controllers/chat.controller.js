const GEMINI_MODEL = "gemini-3.6-flash";
const MAX_MESSAGE_LENGTH = 2000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 250;
const TRANSIENT_STATUS_CODES = new Set([429, 503]);

const languageInstructions = {
  English: "Reply in English.",
  Hindi: "Reply in Hindi using clear, natural Hindi.",
};

function sanitizeErrorMessage(value, apiKey, userMessage) {
  let message = typeof value === "string" ? value : "Gemini request failed.";

  for (const sensitiveValue of [apiKey, userMessage]) {
    if (sensitiveValue) {
      message = message.split(sensitiveValue).join("[REDACTED]");
    }
  }

  return message
    .replace(/\bAIza[0-9A-Za-z_-]{20,}\b/g, "[REDACTED API KEY]")
    .replace(/\bAQ\.[0-9A-Za-z_-]{20,}\b/g, "[REDACTED API KEY]")
    .replace(/([?&](?:key|api_key)=)[^&\s]+/gi, "$1[REDACTED]")
    .replace(/\bBearer\s+\S+/gi, "Bearer [REDACTED]");
}

function logGeminiFailure({
  status,
  providerStatus,
  message,
  attempt,
  apiKey,
  userMessage,
}) {
  console.error("Gemini chat request failed.", {
    status,
    providerStatus:
      providerStatus == null
        ? null
        : sanitizeErrorMessage(String(providerStatus), apiKey, userMessage),
    message: sanitizeErrorMessage(message, apiKey, userMessage),
    attempt,
  });
}

function waitBeforeRetry(attempt) {
  return new Promise((resolve) =>
    setTimeout(resolve, RETRY_DELAY_MS * attempt),
  );
}

function getFriendlyFailure(language) {
  return language === "Hindi"
    ? "AI सेवा अभी अस्थायी रूप से उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर से प्रयास करें।"
    : "The AI assistant is temporarily unavailable. Please try again shortly.";
}

function getDailyQuotaFailure(language) {
  return language === "Hindi"
    ? "AI सेवा की मौजूदा उपयोग सीमा पूरी हो गई है। AI जवाब अभी अस्थायी रूप से उपलब्ध नहीं हैं; कृपया बाद में फिर से प्रयास करें।"
    : "The AI service has reached its current usage limit. Replies are temporarily unavailable; please try again later.";
}

function isDailyQuotaError(providerError) {
  const errorDetails = JSON.stringify(providerError ?? {})
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase();

  return /\b(?:daily|per day|perday|requests per day)\b/.test(errorDetails);
}

async function generateReply(message, language, apiKey) {
  const requestBody = JSON.stringify({
    systemInstruction: {
      parts: [
        {
          text: `You are ShikshaSathi AI, a helpful education assistant for students in Rajasthan. ${languageInstructions[language]} Keep answers clear and supportive. Do not invent current admissions, fees, cutoffs, or scholarship dates; advise students to verify those with official sources.`,
        },
      ],
    },
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: { maxOutputTokens: 700 },
  });

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt += 1) {
    let response;
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: requestBody,
          signal: AbortSignal.timeout(30_000),
        },
      );
    } catch (error) {
      const isTimeout = error?.name === "TimeoutError";
      logGeminiFailure({
        status: null,
        providerStatus: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
        message: error?.message,
        attempt,
        apiKey,
        userMessage: message,
      });

      if (isTimeout && attempt <= MAX_RETRIES) {
        await waitBeforeRetry(attempt);
        continue;
      }

      return null;
    }

    if (!response.ok) {
      let payload;
      let responseReadError;
      try {
        payload = await response.json();
      } catch (error) {
        payload = null;
        responseReadError = error;
      }

      const providerError = payload?.error;
      const responseReadTimedOut = responseReadError?.name === "TimeoutError";
      logGeminiFailure({
        status: response.status,
        providerStatus: responseReadTimedOut
          ? "TIMEOUT"
          : providerError?.status ?? null,
        message: responseReadError?.message ?? providerError?.message,
        attempt,
        apiKey,
        userMessage: message,
      });

      if (
        response.status === 429 &&
        providerError?.status === "RESOURCE_EXHAUSTED" &&
        isDailyQuotaError(providerError)
      ) {
        return { failure: "daily_quota" };
      }

      if (
        (TRANSIENT_STATUS_CODES.has(response.status) ||
          responseReadTimedOut) &&
        attempt <= MAX_RETRIES
      ) {
        await waitBeforeRetry(attempt);
        continue;
      }

      return null;
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      const isTimeout = error?.name === "TimeoutError";
      logGeminiFailure({
        status: response.status,
        providerStatus: isTimeout ? "TIMEOUT" : "INVALID_RESPONSE",
        message: error?.message,
        attempt,
        apiKey,
        userMessage: message,
      });

      if (isTimeout && attempt <= MAX_RETRIES) {
        await waitBeforeRetry(attempt);
        continue;
      }

      return null;
    }

    const reply = result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter((text) => typeof text === "string")
      .join("")
      .trim();

    if (!reply) {
      logGeminiFailure({
        status: response.status,
        providerStatus: "EMPTY_RESPONSE",
        message: "Gemini returned no text.",
        attempt,
        apiKey,
        userMessage: message,
      });
      return null;
    }

    return reply;
  }

  return null;
}

export async function postChatMessage(req, res) {
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const language = req.body?.language;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "A message is required.",
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    });
  }

  if (!Object.hasOwn(languageInstructions, language)) {
    return res.status(400).json({
      success: false,
      message: "Language must be English or Hindi.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({
      success: false,
      message: "AI chat is not configured.",
    });
  }

  const result = await generateReply(message, language, apiKey);
  if (result?.failure === "daily_quota") {
    return res.status(502).json({
      success: false,
      message: getDailyQuotaFailure(language),
    });
  }

  if (!result) {
    return res.status(502).json({
      success: false,
      message: getFriendlyFailure(language),
    });
  }

  return res.json({
    success: true,
    data: { reply: result },
  });
}

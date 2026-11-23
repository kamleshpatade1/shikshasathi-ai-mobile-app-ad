const GEMINI_MODEL = "gemini-3.6-flash";
const MAX_MESSAGE_LENGTH = 2000;

const languageInstructions = {
  English: "Reply in English.",
  Hindi: "Reply in Hindi using clear, natural Hindi.",
};

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

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are ShikshaSathi AI, a helpful education assistant for students in Rajasthan. ${languageInstructions[language]} Keep answers clear and supportive. Do not invent current admissions, fees, cutoffs, or scholarship dates; advise students to verify those with official sources.`,
              },
            ],
          },
          contents: [{ role: "user", parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 700 },
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    if (!response.ok) {
      throw new Error("Gemini request failed.");
    }

    const result = await response.json();
    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter((text) => typeof text === "string")
      .join("")
      .trim();

    if (!reply) {
      throw new Error("Gemini returned no text.");
    }

    return res.json({
      success: true,
      data: { reply },
    });
  } catch {
    console.error("Gemini chat request failed.");
    return res.status(502).json({
      success: false,
      message: "The AI assistant is temporarily unavailable.",
    });
  }
}

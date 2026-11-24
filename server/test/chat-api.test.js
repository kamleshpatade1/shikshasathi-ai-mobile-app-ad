import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import app from "../src/app.js";

const TEST_API_KEY = "test-gemini-api-key";

async function startTestServer(t) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return `http://127.0.0.1:${address.port}`;
}

async function readJson(response) {
  return { status: response.status, body: await response.json() };
}

function setTestApiKey(t) {
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = TEST_API_KEY;
  t.after(() => {
    if (previousKey === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = previousKey;
    }
  });
}

for (const { language, message, reply } of [
  {
    language: "English",
    message: "How do I find a diploma course?",
    reply: "Check the official DTE course listings.",
  },
  {
    language: "Hindi",
    message: "डिप्लोमा कोर्स कैसे खोजूँ?",
    reply: "आधिकारिक DTE पाठ्यक्रम सूची देखें।",
  },
]) {
  test(`POST /api/chat sends a ${language} prompt and returns Gemini text`, async (t) => {
    setTestApiKey(t);
    const baseUrl = await startTestServer(t);
    const nativeFetch = globalThis.fetch;
    let capturedRequest;
    t.mock.method(globalThis, "fetch", async (url, options) => {
      if (String(url).startsWith(baseUrl)) {
        return nativeFetch(url, options);
      }

      capturedRequest = { url: String(url), options };
      return {
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: reply }] } }],
        }),
      };
    });

    const { status, body } = await readJson(
      await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, language }),
      }),
    );

    assert.equal(status, 200);
    assert.equal(body.success, true);
    assert.equal(body.data.reply, reply);
    assert.equal(
      capturedRequest.url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
    );
    assert.equal(
      capturedRequest.options.headers["x-goog-api-key"],
      TEST_API_KEY,
    );
    const geminiBody = JSON.parse(capturedRequest.options.body);
    assert.equal(geminiBody.contents[0].parts[0].text, message);
    assert.match(
      geminiBody.systemInstruction.parts[0].text,
      language === "Hindi" ? /Reply in Hindi/ : /Reply in English/,
    );
  });
}

test("POST /api/chat validates input and does not expose provider errors", async (t) => {
  setTestApiKey(t);
  const baseUrl = await startTestServer(t);
  const nativeFetch = globalThis.fetch;
  const loggedErrors = [];
  t.mock.method(console, "error", (...args) => loggedErrors.push(args));
  let geminiCallCount = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    return {
      ok: false,
      status: 403,
      json: async () => ({
        error: {
          status: "PERMISSION_DENIED",
          message: `Rejected ${TEST_API_KEY} while handling Hello`,
        },
      }),
    };
  });

  const invalidMessage = await readJson(
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "  ", language: "English" }),
    }),
  );
  assert.equal(invalidMessage.status, 400);
  assert.equal(geminiCallCount, 0);

  const providerError = await readJson(
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Hello", language: "Hindi" }),
    }),
  );
  assert.equal(providerError.status, 502);
  assert.match(providerError.body.message, /AI सेवा अभी अस्थायी रूप से उपलब्ध नहीं है/);
  assert.equal(geminiCallCount, 1);
  assert.equal(loggedErrors.length, 1);
  assert.equal(loggedErrors[0][1].status, 403);
  assert.equal(loggedErrors[0][1].providerStatus, "PERMISSION_DENIED");
  assert.equal(loggedErrors[0][1].message, "Rejected [REDACTED] while handling [REDACTED]");
  assert.equal(JSON.stringify(loggedErrors).includes(TEST_API_KEY), false);
  assert.equal(JSON.stringify(loggedErrors).includes("Hello"), false);
  assert.equal(JSON.stringify(providerError.body).includes(TEST_API_KEY), false);
});

test("POST /api/chat retries timeouts and 503 responses at most twice", async (t) => {
  setTestApiKey(t);
  const baseUrl = await startTestServer(t);
  const nativeFetch = globalThis.fetch;
  const loggedErrors = [];
  t.mock.method(console, "error", (...args) => loggedErrors.push(args));
  let geminiCallCount = 0;

  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    if (geminiCallCount === 1) {
      throw Object.assign(new Error("request timed out"), {
        name: "TimeoutError",
      });
    }
    if (geminiCallCount === 2) {
      return {
        ok: false,
        status: 503,
        json: async () => ({
          error: {
            status: "UNAVAILABLE",
            message: "Temporary capacity issue.",
          },
        }),
      };
    }

    return {
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: "Please try again shortly." }] } }],
      }),
    };
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Hello", language: "English" }),
    }),
  );

  assert.equal(status, 200);
  assert.equal(body.data.reply, "Please try again shortly.");
  assert.equal(geminiCallCount, 3);
  assert.equal(loggedErrors.length, 2);
  assert.equal(loggedErrors[0][1].providerStatus, "TIMEOUT");
  assert.equal(loggedErrors[1][1].status, 503);
  assert.equal(loggedErrors[1][1].providerStatus, "UNAVAILABLE");
  assert.equal(JSON.stringify(loggedErrors).includes(TEST_API_KEY), false);
});

test("POST /api/chat stops after two 429 retries and returns a friendly error", async (t) => {
  setTestApiKey(t);
  const baseUrl = await startTestServer(t);
  const nativeFetch = globalThis.fetch;
  let geminiCallCount = 0;
  t.mock.method(console, "error", () => {});

  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    return {
      ok: false,
      status: 429,
      json: async () => ({
        error: { status: "RESOURCE_EXHAUSTED", message: "Rate limit reached." },
      }),
    };
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Hello", language: "English" }),
    }),
  );

  assert.equal(status, 502);
  assert.equal(geminiCallCount, 3);
  assert.equal(
    body.message,
    "The AI assistant is temporarily unavailable. Please try again shortly.",
  );
});

test("POST /api/chat does not retry daily quota exhaustion and explains usage limits", async (t) => {
  setTestApiKey(t);
  const baseUrl = await startTestServer(t);
  const nativeFetch = globalThis.fetch;
  const loggedErrors = [];
  t.mock.method(console, "error", (...args) => loggedErrors.push(args));
  let geminiCallCount = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    return {
      ok: false,
      status: 429,
      json: async () => ({
        error: {
          status: "RESOURCE_EXHAUSTED",
          message: "Quota exceeded for the free tier.",
          details: [
            {
              "@type": "type.googleapis.com/google.rpc.QuotaFailure",
              violations: [
                {
                  quotaId: "GenerateRequestsPerDayPerProjectPerModel-FreeTier",
                  quotaMetric:
                    "generativelanguage.googleapis.com/generate_content_free_tier_requests",
                },
              ],
            },
          ],
        },
      }),
    };
  });

  const responses = [];
  for (const language of ["English", "Hindi"]) {
    const previousCallCount = geminiCallCount;
    const { status, body } = await readJson(
      await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Hello", language }),
      }),
    );

    assert.equal(status, 502);
    assert.equal(geminiCallCount, previousCallCount + 1);
    responses.push(body.message);
  }

  assert.equal(
    responses[0],
    "The AI service has reached its current usage limit. Replies are temporarily unavailable; please try again later.",
  );
  assert.match(responses[1], /उपयोग सीमा पूरी हो गई है/);
  assert.equal(loggedErrors.length, 2);
  assert.equal(loggedErrors[0][1].status, 429);
  assert.equal(loggedErrors[0][1].providerStatus, "RESOURCE_EXHAUSTED");
  assert.equal(JSON.stringify(loggedErrors).includes(TEST_API_KEY), false);
});

test("POST /api/chat returns 503 when GEMINI_API_KEY is missing without calling Gemini", async (t) => {
  const previousKey = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  t.after(() => {
    if (previousKey !== undefined) {
      process.env.GEMINI_API_KEY = previousKey;
    }
  });

  const baseUrl = await startTestServer(t);
  const nativeFetch = globalThis.fetch;
  let geminiCallCount = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    throw new Error("Gemini must not be called without a configured key.");
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Hello", language: "English" }),
    }),
  );

  assert.equal(status, 503);
  assert.equal(body.success, false);
  assert.equal(body.message, "AI chat is not configured.");
  assert.equal(geminiCallCount, 0);
});

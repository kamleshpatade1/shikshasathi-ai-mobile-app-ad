import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import app from "../src/app.js";

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
  process.env.GEMINI_API_KEY = "test-gemini-api-key";
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
      "test-gemini-api-key",
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
  t.mock.method(console, "error", () => {});
  let geminiCallCount = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    if (String(url).startsWith(baseUrl)) {
      return nativeFetch(url, options);
    }

    geminiCallCount += 1;
    return {
      ok: false,
      status: 403,
      json: async () => ({ error: { message: "private provider detail" } }),
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
  assert.equal(
    providerError.body.message,
    "The AI assistant is temporarily unavailable.",
  );
  assert.equal(
    JSON.stringify(providerError.body).includes("private provider detail"),
    false,
  );
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

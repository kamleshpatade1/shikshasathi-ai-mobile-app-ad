import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import app from "../src/app.js";
import Student from "../src/models/student.model.js";

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

function studentRecord(overrides = {}) {
  return {
    _id: "64b000000000000000000001",
    name: "Test Student",
    email: "student@example.test",
    preferredLanguage: "English",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    password: "must-not-be-returned",
    ...overrides,
  };
}

function queryResult(value) {
  return {
    select() {
      return this;
    },
    lean() {
      return Promise.resolve(value);
    },
  };
}

test("POST /api/students normalizes email and returns only public fields", async (t) => {
  const baseUrl = await startTestServer(t);
  let createdFields;
  t.mock.method(Student, "exists", async () => null);
  t.mock.method(Student, "create", async (fields) => {
    createdFields = fields;
    return studentRecord({ ...fields });
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "  Test Student  ",
        email: "  STUDENT@EXAMPLE.TEST ",
        preferredLanguage: "hindi",
      }),
    }),
  );

  assert.equal(status, 201);
  assert.equal(body.success, true);
  assert.equal(createdFields.name, "Test Student");
  assert.equal(createdFields.email, "student@example.test");
  assert.equal(createdFields.preferredLanguage, "Hindi");
  assert.equal(body.data.email, "student@example.test");
  assert.equal("password" in body.data, false);
});

test("POST /api/students rejects missing required fields and unsupported languages", async (t) => {
  const baseUrl = await startTestServer(t);

  const missingFields = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Student" }),
    }),
  );
  assert.equal(missingFields.status, 400);
  assert.match(missingFields.body.message, /email is required/i);

  const unsupportedLanguage = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Student",
        email: "student@example.test",
        preferredLanguage: "Spanish",
      }),
    }),
  );
  assert.equal(unsupportedLanguage.status, 400);
  assert.match(unsupportedLanguage.body.message, /English or Hindi/);
});

test("POST /api/students returns 409 for duplicate email", async (t) => {
  const baseUrl = await startTestServer(t);
  t.mock.method(Student, "exists", async () => ({ _id: "existing" }));

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Student",
        email: "student@example.test",
        preferredLanguage: "English",
      }),
    }),
  );

  assert.equal(status, 409);
  assert.equal(body.message, "A student with this email already exists.");
});

test("POST /api/students maps a concurrent duplicate-email insert to 409", async (t) => {
  const baseUrl = await startTestServer(t);
  t.mock.method(Student, "exists", async () => null);
  t.mock.method(Student, "create", async () => {
    const error = new Error("duplicate key details");
    error.code = 11000;
    error.keyPattern = { email: 1 };
    throw error;
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Student",
        email: "student@example.test",
        preferredLanguage: "English",
      }),
    }),
  );

  assert.equal(status, 409);
  assert.equal(body.message, "A student with this email already exists.");
  assert.equal(JSON.stringify(body).includes("duplicate key details"), false);
});

test("GET /api/students/:id validates IDs, handles missing records, and hides private fields", async (t) => {
  const baseUrl = await startTestServer(t);
  t.mock.method(Student, "findById", (id) =>
    queryResult(
      id === "64b000000000000000000001"
        ? studentRecord()
        : null,
    ),
  );

  const invalidId = await readJson(
    await fetch(`${baseUrl}/api/students/not-an-id`),
  );
  assert.equal(invalidId.status, 400);

  const foundStudent = await readJson(
    await fetch(`${baseUrl}/api/students/64b000000000000000000001`),
  );
  assert.equal(foundStudent.status, 200);
  assert.equal(foundStudent.body.data.email, "student@example.test");
  assert.equal("password" in foundStudent.body.data, false);

  const missingStudent = await readJson(
    await fetch(`${baseUrl}/api/students/64b000000000000000000002`),
  );
  assert.equal(missingStudent.status, 404);
  assert.equal(missingStudent.body.message, "Student not found.");
});

test("PATCH /api/students/:id updates only supplied fields and maps duplicate emails to 409", async (t) => {
  const baseUrl = await startTestServer(t);
  let update;
  let updateResult = studentRecord({ preferredLanguage: "Hindi" });
  let duplicateExists = false;
  t.mock.method(Student, "exists", async () =>
    duplicateExists ? { _id: "another-student" } : null,
  );
  t.mock.method(Student, "findByIdAndUpdate", (id, changes, options) => {
    update = { id, changes, options };
    return queryResult(updateResult);
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/students/64b000000000000000000001`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ preferredLanguage: "hindi" }),
    }),
  );
  assert.equal(status, 200);
  assert.equal(update.changes.$set.preferredLanguage, "Hindi");
  assert.equal(update.options.runValidators, true);
  assert.equal(body.data.preferredLanguage, "Hindi");
  assert.equal("password" in body.data, false);

  duplicateExists = true;
  const duplicateEmail = await readJson(
    await fetch(`${baseUrl}/api/students/64b000000000000000000001`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "taken@example.test" }),
    }),
  );
  assert.equal(duplicateEmail.status, 409);

  duplicateExists = false;
  updateResult = null;
  const missingStudent = await readJson(
    await fetch(`${baseUrl}/api/students/64b000000000000000000002`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Updated Student" }),
    }),
  );
  assert.equal(missingStudent.status, 404);
  assert.equal(missingStudent.body.message, "Student not found.");
});

test("student API hides unexpected database error details", async (t) => {
  const baseUrl = await startTestServer(t);
  t.mock.method(console, "error", () => {});
  t.mock.method(Student, "exists", async () => null);
  t.mock.method(Student, "create", async () => {
    throw new Error("private database detail");
  });

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/students`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Student",
        email: "student@example.test",
        preferredLanguage: "English",
      }),
    }),
  );

  assert.equal(status, 500);
  assert.equal(body.message, "Internal server error.");
  assert.equal(JSON.stringify(body).includes("private database detail"), false);
});

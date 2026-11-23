import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";
import app from "../src/app.js";
import College from "../src/models/college.model.js";
import Course from "../src/models/course.model.js";

async function startTestServer(t) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));

  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return `http://127.0.0.1:${address.port}`;
}

function mockListQuery(t, model, total = 0) {
  const calls = {};

  t.mock.method(model, "find", (filter) => {
    calls.filter = filter;

    return {
      sort(value) {
        calls.sort = value;
        return this;
      },
      skip(value) {
        calls.skip = value;
        return this;
      },
      limit(value) {
        calls.limit = value;
        return this;
      },
      lean() {
        return Promise.resolve([]);
      },
    };
  });
  t.mock.method(model, "countDocuments", async (filter) => {
    calls.countFilter = filter;
    return total;
  });

  return calls;
}

async function readJson(response) {
  return { status: response.status, body: await response.json() };
}

test("GET /api/colleges paginates and filters safely", async (t) => {
  const calls = mockListQuery(t, College, 12);
  const baseUrl = await startTestServer(t);
  const response = await fetch(
    `${baseUrl}/api/colleges?page=3&limit=5&search=c%2B%2B&location=Rajasthan&courseId=64b000000000000000000001`,
  );
  const { status, body } = await readJson(response);

  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.deepEqual(body.data, []);
  assert.deepEqual(body.pagination, {
    page: 3,
    limit: 5,
    total: 12,
    totalPages: 3,
  });
  assert.equal(calls.skip, 10);
  assert.equal(calls.limit, 5);
  assert.equal(calls.filter.courses, "64b000000000000000000001");
  assert.equal(calls.filter.location.test("rajasthan"), true);
  assert.equal(calls.filter.location.test("Rajasthan North"), false);
  assert.equal(
    calls.filter.$or.some((condition) => condition.collegeName?.test("c++")),
    true,
  );
  assert.equal(
    calls.filter.$or.some((condition) => condition.collegeName?.test("c--")),
    false,
  );
});

test("GET /api/courses supports pagination, search, and course-level filtering", async (t) => {
  const calls = mockListQuery(t, Course, 0);
  const baseUrl = await startTestServer(t);
  const response = await fetch(
    `${baseUrl}/api/courses?page=2&limit=3&courseLevel=Undergraduate&search=electrical`,
  );
  const { status, body } = await readJson(response);

  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.deepEqual(body.data, []);
  assert.equal(body.pagination.page, 2);
  assert.equal(body.pagination.limit, 3);
  assert.equal(calls.skip, 3);
  assert.equal(calls.limit, 3);
  assert.equal(calls.filter.courseLevel.test("undergraduate"), true);
  assert.equal(
    calls.filter.$or.some((condition) => condition.courseName?.test("electrical")),
    true,
  );
});

test("list endpoints reject invalid pagination and ObjectId filters", async (t) => {
  const baseUrl = await startTestServer(t);

  const invalidPage = await readJson(
    await fetch(`${baseUrl}/api/colleges?page=0`),
  );
  assert.equal(invalidPage.status, 400);
  assert.equal(invalidPage.body.success, false);

  const invalidCourseId = await readJson(
    await fetch(`${baseUrl}/api/colleges?courseId=not-an-id`),
  );
  assert.equal(invalidCourseId.status, 400);
  assert.equal(invalidCourseId.body.message, "courseId must be a valid MongoDB ObjectId.");

  const excessiveLimit = await readJson(
    await fetch(`${baseUrl}/api/courses?limit=101`),
  );
  assert.equal(excessiveLimit.status, 400);
});

test("detail endpoints reject invalid ObjectIds and return 404 for missing records", async (t) => {
  const baseUrl = await startTestServer(t);

  const invalidCollegeId = await readJson(
    await fetch(`${baseUrl}/api/colleges/invalid-id`),
  );
  assert.equal(invalidCollegeId.status, 400);

  const invalidCourseId = await readJson(
    await fetch(`${baseUrl}/api/courses/invalid-id`),
  );
  assert.equal(invalidCourseId.status, 400);

  const collegeId = "64b000000000000000000001";
  const courseId = "64b000000000000000000002";
  t.mock.method(College, "findById", (id) => ({
    lean: () => Promise.resolve(id === collegeId ? { _id: id } : null),
  }));
  t.mock.method(Course, "findById", (id) => ({
    lean: () => Promise.resolve(id === courseId ? { _id: id } : null),
  }));

  const foundCollege = await readJson(
    await fetch(`${baseUrl}/api/colleges/${collegeId}`),
  );
  assert.equal(foundCollege.status, 200);
  assert.equal(foundCollege.body.success, true);
  assert.deepEqual(foundCollege.body.data, { _id: collegeId });

  const foundCourse = await readJson(
    await fetch(`${baseUrl}/api/courses/${courseId}`),
  );
  assert.equal(foundCourse.status, 200);
  assert.equal(foundCourse.body.success, true);
  assert.deepEqual(foundCourse.body.data, { _id: courseId });

  const missingCollege = await readJson(
    await fetch(`${baseUrl}/api/colleges/64b000000000000000000003`),
  );
  assert.equal(missingCollege.status, 404);
  assert.equal(missingCollege.body.message, "College not found.");

  const missingCourse = await readJson(
    await fetch(`${baseUrl}/api/courses/64b000000000000000000004`),
  );
  assert.equal(missingCourse.status, 404);
  assert.equal(missingCourse.body.message, "Course not found.");
});

test("database errors return a generic message without leaking details", async (t) => {
  const baseUrl = await startTestServer(t);
  t.mock.method(console, "error", () => {});
  t.mock.method(College, "find", () => ({
    sort() {
      return this;
    },
    skip() {
      return this;
    },
    limit() {
      return this;
    },
    lean() {
      return Promise.reject(new Error("private database detail"));
    },
  }));
  t.mock.method(College, "countDocuments", async () => 0);

  const { status, body } = await readJson(
    await fetch(`${baseUrl}/api/colleges`),
  );

  assert.equal(status, 500);
  assert.equal(body.success, false);
  assert.equal(body.message, "Internal server error.");
  assert.equal(JSON.stringify(body).includes("private database detail"), false);
});

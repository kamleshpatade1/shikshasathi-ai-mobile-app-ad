import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  assertNoAmbiguousCollegeMatches,
  assertDteDatasetApproved,
  DteImportSafetyError,
  mapDteCollegeCandidate,
  mapDteProvenanceRecord,
  normalizeDteCollegeSlug,
  stableCollegeObjectIdHex,
  validateDteDataset,
} from "../scripts/dte-import-helpers.js";
import DteImportProvenance from "../src/models/dte-import-provenance.model.js";

const datasetUrl = new URL("../data/official/rajasthan-dte-colleges.json", import.meta.url);
const dataset = JSON.parse(await readFile(datasetUrl, "utf8"));
const manifestUrl = new URL("../data/official/source-manifest.json", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));

test("official DTE candidates validate and duplicate source rows are excluded", () => {
  const summary = validateDteDataset(dataset);

  assert.deepEqual(summary, { collegeCount: 71, courseCount: 0 });
  assert.equal(dataset.datasetStatus, "pending-human-review");
  assert.equal(
    dataset.colleges.some((record) => record.sourceKey.endsWith(":gpckelwara")),
    true,
  );
  assert.equal(
    dataset.colleges.filter((record) => record.sourceKey.endsWith(":gpckelwara")).length,
    1,
  );
  assert.equal(
    dataset.colleges.every(
      (record) =>
        record.sourceKey ===
        `rajasthan-dte-college:${normalizeDteCollegeSlug(
          record.verifiedFields.collegeUrlSlug,
        )}`,
    ),
    true,
  );
});

test("College mapping uses only verified schema fields and does not invent a description", () => {
  const record = dataset.colleges[0];
  const mapped = mapDteCollegeCandidate(record);

  assert.deepEqual(mapped, {
    collegeName: record.verifiedFields.collegeName,
    location: record.verifiedFields.district,
    description: "",
    courses: [],
  });
});

test("stable College IDs and unique provenance keys make reruns idempotent", () => {
  const ids = dataset.colleges.map((record) =>
    stableCollegeObjectIdHex(record.sourceKey),
  );

  assert.equal(ids.every((id) => /^[a-f0-9]{24}$/.test(id)), true);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(
    ids[0],
    stableCollegeObjectIdHex(dataset.colleges[0].sourceKey),
  );
  assert.equal(
    DteImportProvenance.schema
      .indexes()
      .some(([fields, options]) => fields.sourceKey === 1 && options.unique),
    true,
  );
});

test("ambiguous existing College matches fail safely", () => {
  assert.throws(
    () =>
      assertNoAmbiguousCollegeMatches(
        [{ _id: "first" }, { _id: "second" }],
        dataset.colleges[0].sourceKey,
      ),
    (error) =>
      error instanceof DteImportSafetyError &&
      /resolve the ambiguity before importing/.test(error.message),
  );
  assert.doesNotThrow(() =>
    assertNoAmbiguousCollegeMatches([{ _id: "one" }], "source-key"),
  );
});

test("provenance mapping retains all official fields and unavailable markers", () => {
  const record = dataset.colleges[0];
  const provenance = mapDteProvenanceRecord(record, "in-memory-id");

  assert.deepEqual(provenance.verifiedFields, record.verifiedFields);
  assert.equal(typeof provenance.verifiedFields.addressAsPublished, "string");
  assert.equal(typeof provenance.verifiedFields.establishmentYear, "string");
  assert.equal(typeof provenance.verifiedFields.collegeType, "string");
  assert.equal(typeof provenance.verifiedFields.contactEmailAsPublished, "string");
  assert.deepEqual(provenance.unavailableFields, record.unavailableFields);
  assert.equal(provenance.sourceUrl, record.source.url);
  assert.equal(provenance.sourceRow, record.source.row);
});

test("pending data cannot be imported", () => {
  assert.throws(
    () => assertDteDatasetApproved(dataset),
    /pending human review/,
  );

  const approved = structuredClone(dataset);
  approved.datasetStatus = "approved";
  assert.doesNotThrow(() => assertDteDatasetApproved(approved));
});

test("source manifest records every reviewed source URL and access date", () => {
  const sources = manifest.sources.flatMap((source) => [
    source,
    ...(source.linkedDocuments ?? []),
  ]);

  assert.equal(manifest.accessedAt, "2026-11-23");
  assert.equal(
    sources.every((source) => source.url && source.accessedAt === manifest.accessedAt),
    true,
  );
  assert.equal(manifest.recordCounts.uniqueCollegeCandidates, dataset.colleges.length);
  assert.equal(manifest.recordCounts.courseCandidates, dataset.courses.length);
  assert.equal(
    dataset.colleges.every((record) =>
      record.unavailableFields.includes("currentAdmissionDates"),
    ),
    true,
  );
});

test("dataset validation rejects duplicate source rows and incomplete courses", () => {
  const duplicate = structuredClone(dataset);
  duplicate.colleges.push(structuredClone(duplicate.colleges[0]));
  assert.throws(() => validateDteDataset(duplicate), /Duplicate DTE source key/);

  const incompleteCourseSet = structuredClone(dataset);
  incompleteCourseSet.courses.push({});
  assert.throws(() => validateDteDataset(incompleteCourseSet), /course-specific source data/);
});

test("dataset validation rejects unverified or unsupported candidate data", () => {
  const unverified = structuredClone(dataset);
  unverified.datasetStatus = "approved";
  unverified.colleges[0].verificationStatus = "unverified";
  assert.throws(() => validateDteDataset(unverified), /missing required source data/);

  const wrongSourceKey = structuredClone(dataset);
  wrongSourceKey.colleges[0].sourceKey = "unreviewed-key";
  assert.throws(() => validateDteDataset(wrongSourceKey), /derived from its official college slug/);

  const unsupportedField = structuredClone(dataset);
  unsupportedField.colleges[0].candidate.address = "unreviewed address";
  assert.throws(() => validateDteDataset(unsupportedField), /missing required source data/);

  const missingUnavailableMarker = structuredClone(dataset);
  missingUnavailableMarker.colleges[0].unavailableFields =
    missingUnavailableMarker.colleges[0].unavailableFields.filter(
      (field) => field !== "courseDuration",
    );
  assert.throws(() => validateDteDataset(missingUnavailableMarker), /remain marked unavailable/);
});

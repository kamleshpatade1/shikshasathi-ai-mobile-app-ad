import { createHash } from "node:crypto";

const OFFICIAL_COLLEGE_SOURCE_URL =
  "https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469";
const EXPECTED_VERIFICATION_STATUS =
  "official-source-listed-not-independently-cross-checked";
const REQUIRED_UNAVAILABLE_FIELDS = [
  "courseBranches",
  "courseDuration",
  "courseSpecificEligibility",
  "currentAdmissionDates",
];
const REQUIRED_VERIFIED_FIELDS = [
  "collegeName",
  "collegeUrlSlug",
  "district",
  "establishmentYear",
  "addressAsPublished",
  "collegeType",
  "listedCourseType",
];

const normalizeIdentityPart = (value) =>
  value.trim().normalize("NFKC").toLocaleLowerCase("en-US");

export class DteImportSafetyError extends Error {
  constructor(message) {
    super(message);
    this.name = "DteImportSafetyError";
  }
}

export function normalizeDteCollegeSlug(slug) {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stableCollegeObjectIdHex(sourceKey) {
  return createHash("sha256")
    .update(`dte-college:${sourceKey}`, "utf8")
    .digest("hex")
    .slice(0, 24);
}

export function validateDteDataset(dataset) {
  if (
    !dataset ||
    !["pending-human-review", "approved"].includes(dataset.datasetStatus) ||
    dataset.sourceUrl !== OFFICIAL_COLLEGE_SOURCE_URL ||
    Number.isNaN(Date.parse(dataset.accessedAt)) ||
    !Array.isArray(dataset.colleges) ||
    !Array.isArray(dataset.courses)
  ) {
    throw new Error("The DTE import dataset has an invalid structure.");
  }

  if (dataset.courses.length > 0) {
    throw new Error(
      "Course records are not importable until complete, course-specific source data is reviewed.",
    );
  }

  const sourceKeys = new Set();
  const collegeIdentities = new Set();
  const sourceRows = new Set();

  for (const record of dataset.colleges) {
    const candidate = record?.candidate;
    const source = record?.source;
    const verifiedFields = record?.verifiedFields;
    const unavailableFields = record?.unavailableFields;

    if (
      typeof record?.sourceKey !== "string" ||
      !record.sourceKey.trim() ||
      !candidate ||
      Object.keys(candidate).sort().join(",") !== "collegeName,location" ||
      typeof candidate.collegeName !== "string" ||
      !candidate.collegeName.trim() ||
      typeof candidate.location !== "string" ||
      !candidate.location.trim() ||
      source?.url !== OFFICIAL_COLLEGE_SOURCE_URL ||
      source.accessedAt !== dataset.accessedAt ||
      !/^\d{4}-\d{2}-\d{2}$/.test(source.pageLastUpdated) ||
      !Number.isInteger(source.row) ||
      source.row < 1 ||
      !verifiedFields ||
      !Array.isArray(unavailableFields) ||
      record.verificationStatus !== EXPECTED_VERIFICATION_STATUS
    ) {
      throw new Error("A DTE college candidate is missing required source data.");
    }

    if (
      REQUIRED_VERIFIED_FIELDS.some(
        (field) =>
          typeof verifiedFields[field] !== "string" ||
          !verifiedFields[field].trim(),
      )
    ) {
      throw new Error(
        `A DTE college candidate is missing verified source fields: ${record.sourceKey}.`,
      );
    }

    if (
      REQUIRED_UNAVAILABLE_FIELDS.some(
        (field) => !unavailableFields.includes(field),
      )
    ) {
      throw new Error(
        `Unavailable course or admission fields must remain marked unavailable: ${record.sourceKey}.`,
      );
    }

    for (const contactField of [
      "contactEmailAsPublished",
      "contactPhoneAsPublished",
    ]) {
      const hasValue =
        typeof verifiedFields[contactField] === "string" &&
        verifiedFields[contactField].trim().length > 0;
      if (hasValue === unavailableFields.includes(contactField)) {
        throw new Error(
          `Contact source data must be present or explicitly unavailable: ${record.sourceKey}.`,
        );
      }
    }

    if (sourceKeys.has(record.sourceKey)) {
      throw new Error(`Duplicate DTE source key: ${record.sourceKey}`);
    }
    sourceKeys.add(record.sourceKey);

    const expectedSourceKey = `rajasthan-dte-college:${normalizeDteCollegeSlug(
      verifiedFields.collegeUrlSlug,
    )}`;
    if (
      !verifiedFields.collegeUrlSlug.trim() ||
      record.sourceKey !== expectedSourceKey
    ) {
      throw new Error(
        `DTE source key must be derived from its official college slug: ${record.sourceKey}.`,
      );
    }

    if (sourceRows.has(source.row)) {
      throw new Error(`Duplicate DTE source row: ${source.row}`);
    }
    sourceRows.add(source.row);

    const identity = [
      normalizeIdentityPart(candidate.collegeName),
      normalizeIdentityPart(candidate.location),
    ].join("|");
    if (collegeIdentities.has(identity)) {
      throw new Error(
        `Duplicate DTE college identity: ${candidate.collegeName} (${candidate.location}).`,
      );
    }
    collegeIdentities.add(identity);

    if (
      verifiedFields.collegeName !== candidate.collegeName ||
      verifiedFields.district !== candidate.location
    ) {
      throw new Error(
        `DTE source values do not match the College mapping for ${record.sourceKey}.`,
      );
    }
  }

  return {
    collegeCount: dataset.colleges.length,
    courseCount: dataset.courses.length,
  };
}

export function assertDteDatasetApproved(dataset) {
  if (!dataset || dataset.datasetStatus !== "approved") {
    throw new Error(
      "The DTE dataset is pending human review. No database connection or writes were attempted.",
    );
  }
}

export function mapDteCollegeCandidate(record) {
  return {
    collegeName: record.candidate.collegeName,
    location: record.candidate.location,
    description: "",
    courses: [],
  };
}

export function assertNoAmbiguousCollegeMatches(matches, sourceKey) {
  if (matches.length > 1) {
    throw new DteImportSafetyError(
      `Multiple existing College records match ${sourceKey}; resolve the ambiguity before importing.`,
    );
  }
}

export function mapDteProvenanceRecord(record, targetId) {
  return {
    sourceKey: record.sourceKey,
    targetModel: "College",
    targetId,
    sourceUrl: record.source.url,
    accessedAt: new Date(record.source.accessedAt),
    sourceRow: record.source.row,
    verifiedFields: record.verifiedFields,
    unavailableFields: [...record.unavailableFields],
  };
}

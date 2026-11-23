import { readFile } from "node:fs/promises";
import {
  assertNoAmbiguousCollegeMatches,
  assertDteDatasetApproved,
  DteImportSafetyError,
  mapDteCollegeCandidate,
  mapDteProvenanceRecord,
  stableCollegeObjectIdHex,
  validateDteDataset,
} from "./dte-import-helpers.js";

const datasetUrl = new URL("../data/official/rajasthan-dte-colleges.json", import.meta.url);
const dataset = JSON.parse(await readFile(datasetUrl, "utf8"));
const { collegeCount, courseCount } = validateDteDataset(dataset);
const apply = process.argv.slice(2).includes("--apply");

const invalidArguments = process.argv
  .slice(2)
  .filter((argument) => argument !== "--apply");

if (invalidArguments.length > 0) {
  throw new Error("Supported argument: --apply. Without it, the script only validates data.");
}

if (!apply) {
  console.info(
    `Validated ${collegeCount} college candidates and ${courseCount} course candidates. ` +
      `Dataset status: ${dataset.datasetStatus}. No database connection or writes performed.`,
  );
} else {
  assertDteDatasetApproved(dataset);
  await import("dotenv/config");

  const [{ default: mongoose }, { default: College }, { default: DteImportProvenance }, database] =
    await Promise.all([
      import("mongoose"),
      import("../src/models/college.model.js"),
      import("../src/models/dte-import-provenance.model.js"),
      import("../src/config/database.js"),
    ]);

  try {
    await database.connectDatabase();
    await DteImportProvenance.createIndexes();

    for (const record of dataset.colleges) {
      const filter = {
        collegeName: record.candidate.collegeName,
        location: record.candidate.location,
      };
      const collation = { locale: "en", strength: 2 };
      const previousProvenance = await DteImportProvenance.findOne({
        sourceKey: record.sourceKey,
      })
        .select("targetId")
        .lean();
      let college = previousProvenance
        ? await College.findById(previousProvenance.targetId)
            .select("_id collegeName location")
            .lean()
        : null;

      if (
        college &&
        (college.collegeName.trim().toLocaleLowerCase("en-US") !==
          record.candidate.collegeName.trim().toLocaleLowerCase("en-US") ||
          college.location.trim().toLocaleLowerCase("en-US") !==
            record.candidate.location.trim().toLocaleLowerCase("en-US"))
      ) {
        throw new DteImportSafetyError(
          `Existing provenance for ${record.sourceKey} points to a different College; resolve it before importing.`,
        );
      }

      if (!college) {
        const matches = await College.find(filter)
          .collation(collation)
          .select("_id collegeName location")
          .limit(2)
          .lean();

        assertNoAmbiguousCollegeMatches(matches, record.sourceKey);

        if (matches[0]) {
          college = matches[0];
        } else {
          const stableId = new mongoose.Types.ObjectId(
            stableCollegeObjectIdHex(record.sourceKey),
          );
          try {
            college = await College.findOneAndUpdate(
              { _id: stableId },
              {
                $setOnInsert: {
                  _id: stableId,
                  ...mapDteCollegeCandidate(record),
                },
              },
              {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
              },
            )
              .select("_id collegeName location")
              .lean();
          } catch (error) {
            if (error?.code !== 11000) {
              throw error;
            }
            college = await College.findById(stableId)
              .select("_id collegeName location")
              .lean();
            if (!college) {
              throw error;
            }
          }
        }
      }

      if (
        college.collegeName.trim().toLocaleLowerCase("en-US") !==
          record.candidate.collegeName.trim().toLocaleLowerCase("en-US") ||
        college.location.trim().toLocaleLowerCase("en-US") !==
          record.candidate.location.trim().toLocaleLowerCase("en-US")
      ) {
        throw new DteImportSafetyError(
          `Stable source identity ${record.sourceKey} conflicts with an existing College record.`,
        );
      }

      const provenance = mapDteProvenanceRecord(record, college._id);
      const { sourceKey, ...provenanceFields } = provenance;
      try {
        await DteImportProvenance.findOneAndUpdate(
          { sourceKey },
          {
            $set: provenanceFields,
            $setOnInsert: { sourceKey },
          },
          { upsert: true, runValidators: true, setDefaultsOnInsert: true },
        );
      } catch (error) {
        if (error?.code !== 11000) {
          throw error;
        }
        await DteImportProvenance.updateOne(
          { sourceKey },
          { $set: provenanceFields },
          { runValidators: true },
        );
      }
    }

    console.info(
      `Imported provenance for ${collegeCount} reviewed College records. No Course records were imported.`,
    );
  } catch (error) {
    console.error(
      error instanceof DteImportSafetyError
        ? error.message
        : "DTE import failed. Database details were suppressed; verify the database and source records before retrying.",
    );
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

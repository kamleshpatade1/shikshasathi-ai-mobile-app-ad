import mongoose from "mongoose";

const dteImportProvenanceSchema = new mongoose.Schema(
  {
    sourceKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    targetModel: {
      type: String,
      required: true,
      enum: ["College", "Course"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },
    accessedAt: {
      type: Date,
      required: true,
    },
    sourceRow: {
      type: Number,
      required: true,
      min: 1,
    },
    verifiedFields: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    unavailableFields: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const DteImportProvenance =
  mongoose.models.DteImportProvenance ??
  mongoose.model("DteImportProvenance", dteImportProvenanceSchema);

export default DteImportProvenance;

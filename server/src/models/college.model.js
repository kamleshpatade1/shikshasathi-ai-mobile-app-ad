import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: [true, "College name is required."],
      trim: true,
      minlength: [2, "College name must be at least 2 characters."],
      maxlength: [160, "College name cannot exceed 160 characters."],
    },
    location: {
      type: String,
      required: [true, "College location is required."],
      trim: true,
      minlength: [2, "College location must be at least 2 characters."],
      maxlength: [160, "College location cannot exceed 160 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "College description cannot exceed 2000 characters."],
      default: "",
    },
    courses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

collegeSchema.index({ location: 1, collegeName: 1 });

const College =
  mongoose.models.College ?? mongoose.model("College", collegeSchema);

export default College;

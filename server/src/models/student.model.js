import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required."],
      trim: true,
      minlength: [2, "Student name must be at least 2 characters."],
      maxlength: [100, "Student name cannot exceed 100 characters."],
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email address cannot exceed 254 characters."],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
      unique: true,
    },
    preferredLanguage: {
      type: String,
      enum: {
        values: ["English", "Hindi"],
        message: "Preferred language must be English or Hindi.",
      },
      default: "English",
      required: true,
    },
  },
  { timestamps: true },
);

const Student =
  mongoose.models.Student ?? mongoose.model("Student", studentSchema);

export default Student;

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Course name is required."],
      trim: true,
      minlength: [2, "Course name must be at least 2 characters."],
      maxlength: [160, "Course name cannot exceed 160 characters."],
    },
    courseLevel: {
      type: String,
      required: [true, "Course level is required."],
      trim: true,
      minlength: [2, "Course level must be at least 2 characters."],
      maxlength: [80, "Course level cannot exceed 80 characters."],
    },
    duration: {
      type: String,
      required: [true, "Course duration is required."],
      trim: true,
      minlength: [1, "Course duration cannot be empty."],
      maxlength: [60, "Course duration cannot exceed 60 characters."],
    },
    eligibility: {
      type: String,
      required: [true, "Course eligibility is required."],
      trim: true,
      minlength: [2, "Course eligibility must be at least 2 characters."],
      maxlength: [1000, "Course eligibility cannot exceed 1000 characters."],
    },
  },
  { timestamps: true },
);

courseSchema.index({ courseLevel: 1, courseName: 1 });

const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);

export default Course;

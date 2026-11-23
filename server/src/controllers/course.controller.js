import Course from "../models/course.model.js";
import {
  createApiError,
  escapeRegex,
  parsePagination,
  readOptionalQueryString,
} from "../utils/api-query.js";

export async function listCourses(req, res) {
  const { page, limit, skip } = parsePagination(req.query);
  const search = readOptionalQueryString(req.query.search, "search", 100);
  const courseLevel = readOptionalQueryString(
    req.query.courseLevel,
    "courseLevel",
    80,
  );
  const filter = {};

  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { courseName: searchPattern },
      { courseLevel: searchPattern },
      { eligibility: searchPattern },
    ];
  }

  if (courseLevel) {
    filter.courseLevel = new RegExp(`^${escapeRegex(courseLevel)}$`, "i");
  }

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .sort({ courseName: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Course.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: "Courses retrieved successfully.",
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function getCourseById(req, res) {
  const course = await Course.findById(req.params.id).lean();

  if (!course) {
    throw createApiError(404, "Course not found.");
  }

  res.status(200).json({
    success: true,
    message: "Course retrieved successfully.",
    data: course,
  });
}

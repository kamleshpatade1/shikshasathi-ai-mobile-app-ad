import mongoose from "mongoose";
import College from "../models/college.model.js";
import {
  createApiError,
  escapeRegex,
  parsePagination,
  readOptionalQueryString,
} from "../utils/api-query.js";

export async function listColleges(req, res) {
  const { page, limit, skip } = parsePagination(req.query);
  const search = readOptionalQueryString(req.query.search, "search", 100);
  const location = readOptionalQueryString(req.query.location, "location", 160);
  const courseId = readOptionalQueryString(req.query.courseId, "courseId", 24);
  const filter = {};

  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { collegeName: searchPattern },
      { location: searchPattern },
      { description: searchPattern },
    ];
  }

  if (location) {
    filter.location = new RegExp(`^${escapeRegex(location)}$`, "i");
  }

  if (courseId) {
    if (!mongoose.isObjectIdOrHexString(courseId)) {
      throw createApiError(400, "courseId must be a valid MongoDB ObjectId.");
    }
    filter.courses = courseId;
  }

  const [colleges, total] = await Promise.all([
    College.find(filter)
      .sort({ collegeName: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    College.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: "Colleges retrieved successfully.",
    data: colleges,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function getCollegeById(req, res) {
  const college = await College.findById(req.params.id).lean();

  if (!college) {
    throw createApiError(404, "College not found.");
  }

  res.status(200).json({
    success: true,
    message: "College retrieved successfully.",
    data: college,
  });
}

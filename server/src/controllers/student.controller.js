import Student from "../models/student.model.js";
import { createApiError } from "../utils/api-query.js";

const allowedFields = new Set(["name", "email", "preferredLanguage"]);
const publicFields = "_id name email preferredLanguage createdAt updatedAt";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStudentBody(body, { partial = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw createApiError(400, "Request body must be a JSON object.");
  }

  const keys = Object.keys(body);
  if (keys.some((key) => !allowedFields.has(key))) {
    throw createApiError(
      400,
      "Only name, email, and preferredLanguage fields are allowed.",
    );
  }

  if (partial && keys.length === 0) {
    throw createApiError(400, "At least one student field must be provided.");
  }

  if (!partial) {
    for (const field of allowedFields) {
      if (!Object.hasOwn(body, field)) {
        throw createApiError(400, `${field} is required.`);
      }
    }
  }

  const fields = {};

  if (Object.hasOwn(body, "name")) {
    if (typeof body.name !== "string") {
      throw createApiError(400, "name must be a string.");
    }
    const name = body.name.trim();
    if (name.length < 2 || name.length > 100) {
      throw createApiError(400, "name must be between 2 and 100 characters.");
    }
    fields.name = name;
  }

  if (Object.hasOwn(body, "email")) {
    if (typeof body.email !== "string") {
      throw createApiError(400, "email must be a string.");
    }
    const email = body.email.trim().toLowerCase();
    if (email.length > 254 || !emailPattern.test(email)) {
      throw createApiError(400, "email must be a valid email address.");
    }
    fields.email = email;
  }

  if (Object.hasOwn(body, "preferredLanguage")) {
    if (typeof body.preferredLanguage !== "string") {
      throw createApiError(400, "preferredLanguage must be a string.");
    }
    const language = body.preferredLanguage.trim().toLowerCase();
    if (language !== "english" && language !== "hindi") {
      throw createApiError(
        400,
        "preferredLanguage must be English or Hindi.",
      );
    }
    fields.preferredLanguage = language === "english" ? "English" : "Hindi";
  }

  return fields;
}

function isDuplicateEmailError(error) {
  const keyPattern = error?.keyPattern;
  const keyValue = error?.keyValue;

  return (
    error?.code === 11000 &&
    (Object.hasOwn(keyPattern ?? {}, "email") ||
      Object.hasOwn(keyValue ?? {}, "email"))
  );
}

function handleWriteError(error) {
  if (isDuplicateEmailError(error)) {
    throw createApiError(409, "A student with this email already exists.");
  }

  if (error?.name === "ValidationError" || error?.name === "CastError") {
    throw createApiError(400, "Student data is invalid.");
  }

  throw error;
}

async function ensureEmailAvailable(email, excludeId) {
  const filter = { email };
  if (excludeId) {
    filter._id = { $ne: excludeId };
  }

  if (await Student.exists(filter)) {
    throw createApiError(409, "A student with this email already exists.");
  }
}

function toPublicStudent(student) {
  const record =
    typeof student?.toObject === "function" ? student.toObject() : student;

  return {
    _id: record._id,
    name: record.name,
    email: record.email,
    preferredLanguage: record.preferredLanguage,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export async function createStudent(req, res) {
  const fields = validateStudentBody(req.body);
  await ensureEmailAvailable(fields.email);

  let student;
  try {
    student = await Student.create(fields);
  } catch (error) {
    handleWriteError(error);
  }

  res.status(201).json({
    success: true,
    message: "Student profile created successfully.",
    data: toPublicStudent(student),
  });
}

export async function getStudentById(req, res) {
  const student = await Student.findById(req.params.id)
    .select(publicFields)
    .lean();

  if (!student) {
    throw createApiError(404, "Student not found.");
  }

  res.status(200).json({
    success: true,
    message: "Student retrieved successfully.",
    data: toPublicStudent(student),
  });
}

export async function updateStudent(req, res) {
  const fields = validateStudentBody(req.body, { partial: true });

  if (fields.email) {
    await ensureEmailAvailable(fields.email, req.params.id);
  }

  let student;
  try {
    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: fields },
      { new: true, runValidators: true },
    )
      .select(publicFields)
      .lean();
  } catch (error) {
    handleWriteError(error);
  }

  if (!student) {
    throw createApiError(404, "Student not found.");
  }

  res.status(200).json({
    success: true,
    message: "Student profile updated successfully.",
    data: toPublicStudent(student),
  });
}

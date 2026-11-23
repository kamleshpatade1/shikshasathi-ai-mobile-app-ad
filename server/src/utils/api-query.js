export function createApiError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function parsePositiveInteger(value, name, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    throw createApiError(400, `${name} must be a positive integer.`);
  }

  const parsedValue = Number(value);
  if (!Number.isSafeInteger(parsedValue) || parsedValue < 1) {
    throw createApiError(400, `${name} must be a positive integer.`);
  }

  return parsedValue;
}

export function parsePagination(query) {
  const page = parsePositiveInteger(query.page, "page", 1);
  const limit = parsePositiveInteger(query.limit, "limit", 20);

  if (limit > 100) {
    throw createApiError(400, "limit cannot exceed 100.");
  }

  const skip = (page - 1) * limit;
  if (!Number.isSafeInteger(skip)) {
    throw createApiError(400, "Requested page is too large.");
  }

  return { page, limit, skip };
}

export function readOptionalQueryString(value, name, maximumLength) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw createApiError(400, `${name} must be a single string value.`);
  }

  const normalizedValue = value.trim();
  if (normalizedValue.length > maximumLength) {
    throw createApiError(
      400,
      `${name} cannot exceed ${maximumLength} characters.`,
    );
  }

  return normalizedValue || undefined;
}

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

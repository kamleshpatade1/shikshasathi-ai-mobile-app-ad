export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode =
    Number.isInteger(error.statusCode) &&
    error.statusCode >= 400 &&
    error.statusCode <= 599
      ? error.statusCode
      : Number.isInteger(error.status) &&
          error.status >= 400 &&
          error.status <= 599
        ? error.status
        : 500;

  if (statusCode >= 500) {
    console.error("Unhandled API error:", error.name || "Error");
  }

  const message =
    statusCode >= 500
      ? "Internal server error."
      : error.type === "entity.parse.failed"
        ? "Invalid JSON request body."
        : error.message || "Request failed.";

  res.status(statusCode).json({ success: false, message });
}

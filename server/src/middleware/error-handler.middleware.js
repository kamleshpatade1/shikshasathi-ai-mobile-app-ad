export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode =
    Number.isInteger(error.statusCode) && error.statusCode >= 400
      ? error.statusCode
      : Number.isInteger(error.status) && error.status >= 400
        ? error.status
        : 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  const message =
    statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Internal server error."
      : error.message || "Internal server error.";

  res.status(statusCode).json({ success: false, message });
}

import mongoose from "mongoose";
import { createApiError } from "../utils/api-query.js";

export function validateObjectId(parameterName = "id") {
  return function objectIdValidator(req, res, next) {
    if (!mongoose.isObjectIdOrHexString(req.params[parameterName])) {
      return next(createApiError(400, "Invalid MongoDB ObjectId."));
    }

    next();
  };
}

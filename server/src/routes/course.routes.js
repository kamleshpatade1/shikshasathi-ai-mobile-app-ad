import { Router } from "express";
import {
  getCourseById,
  listCourses,
} from "../controllers/course.controller.js";
import { validateObjectId } from "../middleware/validate-object-id.middleware.js";

const courseRouter = Router();

courseRouter.get("/", listCourses);
courseRouter.get("/:id", validateObjectId(), getCourseById);

export default courseRouter;

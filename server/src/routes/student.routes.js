import { Router } from "express";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../controllers/student.controller.js";
import { validateObjectId } from "../middleware/validate-object-id.middleware.js";

const studentRouter = Router();

studentRouter.post("/", createStudent);
studentRouter.get("/:id", validateObjectId(), getStudentById);
studentRouter.patch("/:id", validateObjectId(), updateStudent);

export default studentRouter;

import { Router } from "express";
import {
  getCollegeById,
  listColleges,
} from "../controllers/college.controller.js";
import { validateObjectId } from "../middleware/validate-object-id.middleware.js";

const collegeRouter = Router();

collegeRouter.get("/", listColleges);
collegeRouter.get("/:id", validateObjectId(), getCollegeById);

export default collegeRouter;

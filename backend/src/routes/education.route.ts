import express from "express";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "../controllers/education.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createEducation);
router.get("/get", authMiddleware, getEducations);
router.put("/update/:educationId", authMiddleware, updateEducation);
router.delete("/delete/:educationId", authMiddleware, deleteEducation);

export default router;

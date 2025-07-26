import { authMiddleware } from "./../middlewares/authMiddleware";
import express from "express";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/experience.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createExperience);
router.get("/get", authMiddleware, getExperiences);
router.put("/update/:experienceId", authMiddleware, updateExperience);
router.delete("/delete/:experienceId", authMiddleware, deleteExperience);

export default router;

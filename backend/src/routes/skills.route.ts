import express from "express";
import {
  createSkills,
  getSkills,
  updateSkills,
} from "../controllers/skills.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createSkills);
router.get("/get", authMiddleware, getSkills);
router.patch("/update", authMiddleware, updateSkills);

export default router;

import express from "express";
import { authMiddleware } from "./../middlewares/authMiddleware.js";
import {
  createAchievements,
  deleteAchievements,
  getAchievements,
  updateAchievements,
} from "../controllers/achievements.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createAchievements);
router.get("/get", authMiddleware, getAchievements);
router.put("/update/:achievementId", authMiddleware, updateAchievements);
router.delete("/delete/:achievementId", authMiddleware, deleteAchievements);

export default router;

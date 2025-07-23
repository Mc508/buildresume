import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createProfile);
router.get("/get", authMiddleware, getProfile);
router.post("/update", authMiddleware, updateProfile);

export default router;

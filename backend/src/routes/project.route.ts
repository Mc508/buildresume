import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multer.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.single("thumbnail"),
  uploadImage("post"),
  createProject
);
router.get("/get", authMiddleware, getProjects);
router.get("/get/:projectId", authMiddleware, getProject);
router.put(
  "/update/:projectId",
  authMiddleware,
  upload.single("thumbnail"),
  uploadImage("put"),
  updateProject
);
router.delete("/delete/:projectId", authMiddleware, deleteProject);

export default router;

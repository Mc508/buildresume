import { authMiddleware } from "./../middlewares/authMiddleware.js";
import express from "express";
import {
  createCertification,
  deleteCertification,
  getCertifications,
  updateCertification,
} from "../controllers/certification.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createCertification);
router.get("/get", authMiddleware, getCertifications);
router.put("/update/:certificationId", authMiddleware, updateCertification);
router.delete("/delete/:certificationId", authMiddleware, deleteCertification);

export default router;

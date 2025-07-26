import { Request, Response } from "express";
import { Certification } from "../model/certification.model.js";

export const createCertification = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const { name, issuer, issueDate, certificateLink } = req.body;
    const certificate = await Certification.create({
      userId,
      name,
      issuer,
      issueDate,
      certificateLink,
    });
    res.status(200).json({ message: "Certification created", certificate });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getCertifications = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const certifications = await Certification.find({ userId });
    res.status(200).json({ message: "Certifications found", certifications });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const certificationId = req.params.certificationId;
  try {
    const { name, issuer, issueDate, certificateLink } = req.body;
    const certification = await Certification.findOneAndUpdate(
      { _id: certificationId, userId },
      { name, issuer, issueDate, certificateLink },
      { new: true }
    );
    res.status(200).json({ message: "Certification updated", certification });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const certificationId = req.params.certificationId;
    await Certification.deleteOne({ _id: certificationId });
    res.status(200).json({ message: "Certification deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

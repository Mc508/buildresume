import { Request, Response } from "express";
import { Education } from "../model/education.model.js";

export const createEducation = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { degree, university, passingYear, percentage } = req.body;

  try {
    const education = await Education.create({
      userId,
      degree,
      university,
      passingYear,
      percentage,
    });
    res.status(201).json({ message: "Education created", education });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getEducations = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const educations = await Education.find({ userId });
    res.status(200).json({ message: "Educations found", educations });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

export const updateEducation = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const educationId = req.params.educationId;
  const { degree, university, passingYear, percentage } = req.body;
  try {
    const education = await Education.findOneAndUpdate(
      { _id: educationId, userId },
      { degree, university, passingYear, percentage },
      { new: true }
    );
    res.status(200).json({ message: "Education updated", education });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const educationId = req.params.educationId;
    const education = await Education.deleteOne({ _id: educationId });
    res.status(200).json({ message: "Education deleted", education });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

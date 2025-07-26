import { Request, Response } from "express";
import { Experience } from "../model/experience.model.js";

export const createExperience = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { company, position, startDate, endDate, description } = req.body;
  try {
    const experience = await Experience.create({
      userId,
      company,
      position,
      startDate,
      endDate,
      description,
    });
    res.status(201).json({ message: "Experience created", experience });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getExperiences = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const experiences = await Experience.find({ userId });
    res.status(200).json({ message: "Experiences found", experiences });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const experienceId = req.params.experienceId;
  const { company, position, startDate, endDate, description } = req.body;
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: experienceId, userId },
      { company, position, startDate, endDate, description },
      { new: true }
    );
    res.status(200).json({ message: "Experience updated", experience });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const experienceId = req.params.experienceId;
    await Experience.deleteOne({ _id: experienceId });
    res.status(200).json({ message: "Experience deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

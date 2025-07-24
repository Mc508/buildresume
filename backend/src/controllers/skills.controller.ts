import { Request, Response } from "express";
import { Skills } from "../model/skills.model.js";

export const createSkills = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  console.log(userId);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { skills } = req.body;
    const skillsData = await Skills.create({ userId, skills });
    res.status(201).json({ message: "Skills created", skillsData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getSkills = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const skills = await Skills.findOne({ userId });
    res.status(200).json({ message: "Skills found", skills });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateSkills = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { skills } = req.body;
    const skillsData = await Skills.findOneAndUpdate({ userId }, { skills });
    res.status(200).json({ message: "Skills updated", skillsData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

import { Request, Response } from "express";
import { Achievement } from "../model/achievments.model.js";

export const createAchievements = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const { title, description } = req.body;
    const achievementsData = await Achievement.create({
      userId,
      title,
      description,
    });
    res.status(201).json({ message: "Achievements created", achievementsData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getAchievements = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const achievements = await Achievement.find({ userId });
    res.status(200).json({ message: "Achievements found", achievements });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateAchievements = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const { title, description } = req.body;
    const achievementsId = req.params.achievementsId;
    const achievementsData = await Achievement.findOneAndUpdate(
      { _id: achievementsId, userId },
      { title, description },
      { new: true }
    );
    res.status(200).json({ message: "Achievements updated", achievementsData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteAchievements = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const achievementsId = req.params.achievementsId;
    await Achievement.deleteOne({ _id: achievementsId });
    res.status(200).json({ message: "Achievements deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

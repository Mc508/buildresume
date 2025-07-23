import { Request, Response } from "express";
import { Profile } from "../model/profile.model.js";

export const createProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  console.log(userId);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { first_name, last_name, email, linkedin, x, github, about } =
      req.body;
    const profile = await Profile.create({
      userId,
      first_name,
      last_name,
      email,
      linkedin,
      x,
      github,
      about,
    });
    console.log(profile);
    return res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const profile = await Profile.findOne({ userId });
    res.status(200).json({ message: "Profile found", profile });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const { first_name, last_name, email, linkedin, x, github, about } =
      req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { first_name, last_name, email, linkedin, x, github, about }
    );
    res.status(200).json({ message: "Profile updated", profile });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

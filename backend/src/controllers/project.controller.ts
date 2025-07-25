import { Request, Response } from "express";
import { Project } from "../model/project.model.js";
import { deleteThumbnail } from "../utils/cloudinary.js";

export const createProject = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const { name, github, liveLink, technology, description, thumbnail } =
      req.body;

    const project = await Project.create({
      userId,
      name,
      github,
      liveLink,
      technology,
      description,
      thumbnail,
    });

    console.log("Project created");
    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  try {
    const projects = await Project.find({ userId });
    res.status(200).json({ message: "Projects found", projects });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getProject = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    res.status(200).json({ message: "Project found", project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const projectId = req.params.projectId;
  console.log(projectId);
  try {
    const { name, github, liveLink, technology, description, thumbnail } =
      req.body;

    // The query should use _id: projectId
    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId }, // ✅ fix here
      { name, github, liveLink, technology, description, thumbnail },
      { new: true } // ✅ return the updated document
    );

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or you don't have permission." });
    }

    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId).select("-__v").exec();
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await deleteThumbnail(project.thumbnail.publicId);
    await Project.deleteOne({ _id: projectId });
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

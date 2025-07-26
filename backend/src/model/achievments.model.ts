import mongoose, { Schema } from "mongoose";
import { IAchievement } from "../types/types";

const achievementSchema = new Schema<IAchievement>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});

export const Achievement = mongoose.model<IAchievement>(
  "Achievement",
  achievementSchema
);

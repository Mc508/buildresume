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
  },
  description: {
    type: String,
  },
});

export const Achievement = mongoose.model("Achievement", achievementSchema);

import mongoose, { Schema } from "mongoose";
import { ISkills } from "../types/types";

const skillsSchema = new Schema<ISkills>({
  userId: {
    type: mongoose.Schema.Types.ObjectId as any,
    ref: "User",
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
});

export const Skills = mongoose.model("Skills", skillsSchema);

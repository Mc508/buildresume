import mongoose, { Schema } from "mongoose";
import { IEducation } from "../types/types";

const educationSchema = new Schema<IEducation>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
  },
});

export const Education = mongoose.model("Education", educationSchema);

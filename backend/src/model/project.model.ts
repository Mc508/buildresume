import mongoose, { Schema } from "mongoose";
import { IProject } from "../types/types";

const projectSchema = new Schema<IProject>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
  technology: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  thumbnail: {
     publicId: {
        type: String,
        required: [true, 'Banner public id required'],
      },
      url: {
        type: String,
        required: [true, 'Banner url required'],
      },
      width: {
        type: Number,
        required: [true, 'Banner width required'],
      },
      height: {
        type: Number,
        required: [true, 'Banner height required'],
      },
  }, // image filename or URL
});

export const Project = mongoose.model("Project", projectSchema);

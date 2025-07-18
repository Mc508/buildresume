import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types/types";
const profileSchema = new Schema<IProfile>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  linkedin: {
    type: String,
  },
  x: {
    type: String,
  },
  github: {
    type: String,
  },
  about: {
    type: String,
  },
});

export const Profile = mongoose.model("Profile", profileSchema);

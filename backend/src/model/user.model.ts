import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const userSchema = new Schema<IUser>({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);

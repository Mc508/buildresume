import mongoose, { Schema } from "mongoose";

const achievementSchema = new Schema({
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

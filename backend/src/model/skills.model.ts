import mongoose, { Schema } from "mongoose";

const skillsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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

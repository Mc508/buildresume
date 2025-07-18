import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  }, // null if present
  description: {
    type: String,
  },
});

export const Experience = mongoose.model("Experience", experienceSchema);

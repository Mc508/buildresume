import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  github: { type: String ,required:true},
  liveLink: { type: String },
  technology: [{ type: String }],
  description: { type: String },
  thumbnail: { type: String }, // image filename or URL
});

export const Project = mongoose.model("Project", projectSchema);

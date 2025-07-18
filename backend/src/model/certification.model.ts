import mongoose, { Schema } from "mongoose";
import { ICertification } from "../types/types";

const certificationSchema = new Schema<ICertification>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
  },
  issueDate: {
    type: Date,
  },
  certificateLink: {
    type: String,
  },
});

export const Certification = mongoose.model(
  "Certification",
  certificationSchema
);

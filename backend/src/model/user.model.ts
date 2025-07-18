import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const userSchema = new Schema<IUser>({
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
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model("User", userSchema);
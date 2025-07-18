import { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const existingUser = await User.findOne({ email, provider: "local" });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local",
  });
  console.log(JWT_SECRET);
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(201).json({ token, user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await User.findOne({ email, provider: "local" }));

  if (!user) return res.status(400).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  return res.status(200).json({ token, user });
};

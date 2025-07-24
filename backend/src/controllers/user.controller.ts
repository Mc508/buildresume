import { Request, Response } from "express";
import { User } from "../model/user.model.js";
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
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ token, user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await User.findOne({ email, provider: "local" });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password!);

  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ token, user });
};

export const loginSuccess = (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({ message: "Login successful", user: req.user });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

export const logout = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[0];
  console.log(token);
  req.cookies.access_token = null;
  req.logout(() => {
    res.redirect("/login");
  });
};

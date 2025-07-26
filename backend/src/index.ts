import "dotenv/config";
import express from "express";
import passport from "passport";
import "./config/passport.js";
//routes
import authRoute from "./routes/user.route.js";
import profileRoute from "./routes/profile.route.js";
import skillsRoute from "./routes/skills.route.js";
import projectRoute from "./routes/project.route.js";
import educationRoute from "./routes/education.route.js";

import { connectDB } from "./config/db.js";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/skills", skillsRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/education", educationRoute);

app.listen(PORT, () => {
  console.log("Server started on port ok 3000");
});

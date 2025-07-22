import "dotenv/config";
import express from "express";
import passport from "passport";
import "./config/passport.js";
//routes
import authRoute from "./routes/user.route.js";
import { connectDB } from "./config/db.js";
import session from "express-session";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server started on port ok 3000");
});

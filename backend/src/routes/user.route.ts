import express from "express";
import {
  login,
  loginSuccess,
  logout,
  register,
} from "../controllers/user.controller.js";
import passport from "passport";

const router = express.Router();

//manual auth
router.post("/register", register);
router.post("/login", login);

//google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

//github auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/success");
  }
);

router.get("/success", loginSuccess);

router.get("/logout", logout);

export default router;

import passport from "passport";
import { Request } from "express";
import {
  Strategy as GoogleStrategy,
  GoogleCallbackParameters,
  VerifyCallback,
  Profile as GoogleProfile,
} from "passport-google-oauth20";
import {
  Strategy as GithubStrategy,
  Profile as GithubProfile,
} from "passport-github2";

import { User } from "../model/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: GoogleProfile,
      done: VerifyCallback
    ) => {
      // Your user logic here...
      // e.g., await User.findOne(...);
      try {
        const existingUser = await User.findOne({
          providerId: profile.id,
          provider: "google",
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          provider: "google",
          providerId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        });

        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/api/v1/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done: (err: any, user?: Express.User | false | null) => void
    ) => {
      try {
        const existingUser = await User.findOne({
          providerId: profile.id,
          provider: "github",
        });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          provider: "github",
          providerId: profile.id,
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value,
          avatar: profile.photos?.[0]?.value,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize & Deserialize
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;

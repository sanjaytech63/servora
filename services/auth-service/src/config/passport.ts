import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { env } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.APP_URL}/api/v1/auth/google/callback`,
    },

    async (_accessToken, _refreshToken, profile, done) => {
      done(null, profile);
    },
  ),
);

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const RegistrationKey = require("../models/registrationKey");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "373435158535-32lsgk1s8pkfoe0nq8stecqifkpsa4uq.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            role: "user",
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

async function createVolunteerRegistrationKey() {
  return await createRegistrationKey("volunteer");
}

async function listUsers() {
  return await User.findAll();
}

module.exports = { createVolunteerRegistrationKey, listUsers };

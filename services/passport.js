const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const CoinbaseStrategy = require("passport-coinbase").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ userId: profile.emails[0].value });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        userId: profile.emails[0].value,
        displayName: profile.displayName,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
      proxy: true
    },
    async (token, tokenSecret, profile, cb, done) => {
      const existingUser = await User.findOne({ userId: cb.emails[0].value });

      if (existingUser) {
        console.log(cb.emails[0].value);
        return done(null, existingUser);
      }

      const user = await new User({
        userId: cb.emails[0].value,
        displayName: cb.displayName,
        email: cb.emails[0].value
      }).save();
      console.log(profile);
      done(null, user);
    }
  )
);

// passport.use(
//   new CoinbaseStrategy(
//     {
//       clientID: keys.coinbaseClientID,
//       clientSecret: keys.ClientSecret,
//       callbackURL: "/auth/coinbase/callback",
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       const existingUser = await User.findOne({ userId: user.id });
//
//       if (existingUser) {
//         console.log(profile);
//         return done(null, existingUser);
//       }
//
//       const user = await new User({
//         userId: user.email,
//         displayName: user.displayName,
//         email: user.email
//       }).save();
//       console.log(profile);
//       done(null, user);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.facebookClientID,
//       clientSecret: keys.facebookClientSecret,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"],
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, cb, done) => {
//       const existingUser = await User.findOne({ userId: cb.emails[0].value });
//
//       if (existingUser) {
//         console.log(cb);
//         return done(null, existingUser);
//       }
//
//       const user = await new User({
//         userId: cb.id,
//         displayName: cb.displayName,
//         email: cb.emails[0].value
//       }).save();
//       console.log(profile);
//       done(null, user);
//     }
//   )
// );

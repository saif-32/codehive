import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/users.js'
import { profileRouter } from './routes/profile.js'
import { UserModel } from './models/Users.js';
import dotenv from 'dotenv';
import { passwordRouter } from './routes/pass-reset.js';
dotenv.config();

mongoose.connect("mongodb+srv://hiveadmin:ZbYOedcubmWvLEsc@codehive.ihhueao.mongodb.net/CodeHive?retryWrites=true&w=majority") // Establishes connection

const app = express(); // Generate version of API
app.use(express.json()); // Converts data from frontend to JSON
app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
})); // Allows API requests from frontend

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Testing purposes, set to false.
}))

app.use(cookieParser('keyboardcat'))

app.use(passport.initialize())
app.use(passport.session())
passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
          return done(null, false);
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    })
);

passport.use(new GoogleStrategy({
  clientID: '899639630095-4s3uehmkjmvkhl0q5mtr1c0f9hpkv6ee.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3001/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {

  UserModel.findOrCreate({ 
    googleId: profile.id,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    username: profile.emails[0].value.split("@")[0],
    email: profile.emails[0].value,
    verified: true
  }, function (err, user) {
    if (err) {
      console.log(err)
      return cb(null);
    }
    // No error occurred, continue with the user authentication process
    return cb(null, user);
  });
}
));

passport.use(new GitHubStrategy({
  clientID: '568bee18a368cffd5fdd',
  clientSecret: 'c370cb694ba0e7545d601a901dd278067b584330',
  callbackURL: "http://localhost:3001/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  let firstName = "";
  let lastName = "";
  try {
    const displayName = profile.displayName.split(' ');
    firstName = displayName[0];
    lastName = displayName.length > 1 ? displayName.slice(1).join(" ") : "";
  } catch (error) {
    firstName = "";
    lastName = "";
  }

  UserModel.findOrCreate({ 
    githubId: profile.id,
    username: profile.username,
    firstName,
    lastName,
    verified: true
  }, function (err, user) {
    if (err) {
      console.log(err)
      return cb(null);
    }
    // No error occurred, continue with the user authentication process
    return cb(null, user);
  });
}
));



passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

passport.deserializeUser(async (id, cb) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        const userInformation = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        };
        cb(null, userInformation);
      } else {
        cb(null, null);
      }
    } catch (err) {
      cb(err);
    }
  });


app.use("/auth", userRouter); // Whatever pages are created in users.js will proceed /auth 
app.use("/profile", profileRouter);
app.use("/password", passwordRouter);

app.listen(3001, () => console.log("Server is running.")); // Starts the server
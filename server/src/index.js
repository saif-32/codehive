import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import { UserModel } from './models/Users.js';
import { userRouter } from './routes/users.js'
import { passwordRouter } from './routes/pass-reset.js';
import { discoverRouter } from './routes/discover.js';
import { uploadRouter } from './routes/upload.js';
import { profileRouter } from './routes/profile.js';


import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';

dotenv.config();

console.log(process.env.EXAMPLE)

// Establishes connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express(); // Generate version of API
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json()); // Converts data from frontend to JSON
app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
})); // Allows API requests from frontend

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Testing purposes, set to false.
}))

app.use(cookieParser(process.env.SESSION_SECRET))

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
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          birthdayMonth: user.birthdayMonth,
          birthdayDay: user.birthdayDay,
          birthdayYear: user.birthdayYear,
          friends: user.friends,
          email: user.email,
          profilePicture: user.profilePicture,
          gender: user.gender,
          university: user.university,
          gradeLevel: user.gradeLevel,
          languages: user.languages,
          interests: user.interests,
          skillLevel: user.skillLevel,
          profileCompleted: user.profileCompleted,
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
app.use("/discover", discoverRouter);
app.use("/upload", uploadRouter);


app.listen(3001, () => console.log("Server is running.")); // Starts the server
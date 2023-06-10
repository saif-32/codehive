import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/users.js'
import { profileRouter } from './routes/profile.js'
import { UserModel } from './models/Users.js';

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

app.listen(3001, () => console.log("Server is running.")); // Starts the server
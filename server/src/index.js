import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js'
import { profileRouter } from './routes/profile.js'

const app = express(); // Generate version of API
app.use(express.json()); // Converts data from frontend to JSON
app.use(cors()); // Allows API requests from frontend

app.use("/auth", userRouter); // Whatever pages are created in users.js will proceed /auth 
app.use("/profile", profileRouter);

mongoose.connect("mongodb+srv://hiveadmin:ZbYOedcubmWvLEsc@codehive.ihhueao.mongodb.net/CodeHive?retryWrites=true&w=majority") // Establishes connection

app.listen(3001, () => console.log("Server is running.")); // Starts the server
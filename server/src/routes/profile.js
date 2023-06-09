import express from "express";
import mongoose from "mongoose";
import { ProfileModel } from "../models/Profile.js"

const router = express.Router();

router.post("/", async(req, res) =>{
    const profile = new ProfileModel(req.body);
    try {
        const response = await profile.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})


export { router as profileRouter };
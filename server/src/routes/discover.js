import { UserModel } from '../models/Users.js';
import express from 'express';
const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({}, 'firstName lastName username age university skillLevel languages interests');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/school", async (req, res) => {
    try {
        const { userUniversity } = req.body;
        const users = await UserModel.find({university: userUniversity}, 'firstName lastName username age university skillLevel languages interests');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/level", async (req, res) => {
    try {
        const { userLevel } = req.body;
        const users = await UserModel.find({skillLevel: userLevel}, 'firstName lastName username age university skillLevel languages interests');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/interests", async (req, res) => {
    try {
        const { userInterests } = req.body;
        const users = await UserModel.find({interests: userInterests}, 'firstName lastName username age university skillLevel languages interests');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/languages", async (req, res) => {
    try {
        const { userLanguage } = req.body;
        const users = await UserModel.find({languages: userLanguage}, 'firstName lastName username age university skillLevel languages interests');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});


export { router as discoverRouter };
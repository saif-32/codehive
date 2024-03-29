import { UserModel } from '../models/Users.js';
import express from 'express';
import pkg from 'lodash';
const { escapeRegExp } = pkg;

const router = express.Router();


router.post("/users", async (req, res) => {
    try {
        const { userMainSearch } = req.body;
        const escapedUserLevels = escapeRegExp(userMainSearch);
        const regex = new RegExp(escapedUserLevels, "i"); // "i" flag makes it case-insensitive
        const users = await UserModel.find({username: regex, profileCompleted: true}, 'firstName lastName username age university skillLevel languages interests profilePicture');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/school", async (req, res) => {
    try {
        const { userUniversity } = req.body;
        const escapedUserUniversity = escapeRegExp(userUniversity);
        const regex = new RegExp(escapedUserUniversity, "i"); // "i" flag makes it case-insensitive
        const users = await UserModel.find({university: regex, profileCompleted: true}, 'firstName lastName username age university skillLevel languages interests profilePicture');
        console.log(users)
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/level", async (req, res) => {
    try {
        const { userLevel } = req.body;
        const escapedUserLevels = escapeRegExp(userLevel);
        const regex = new RegExp(escapedUserLevels, "i"); // "i" flag makes it case-insensitive
        const users = await UserModel.find({skillLevel: regex, profileCompleted: true}, 'firstName lastName username age university skillLevel languages interests profilePicture');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/interests", async (req, res) => {
    try {
        const { userInterests } = req.body;
        const escapedUserInterests = escapeRegExp(userInterests);
        const regex = new RegExp(escapedUserInterests, "i"); // "i" flag makes it case-insensitive
        const users = await UserModel.find({ interests: regex, profileCompleted: true}, 'firstName lastName username age university skillLevel languages interests profilePicture');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

router.post("/users/languages", async (req, res) => {
    try {
        const { userLanguage } = req.body;
        const escapedUserLanguage = escapeRegExp(userLanguage);
        const regex = new RegExp(escapedUserLanguage, "i"); // "i" flag makes it case-insensitive
        const users = await UserModel.find({ languages: regex, profileCompleted: true}, 'firstName lastName username age university skillLevel languages interests profilePicture');
        const count = users.length;
        res.json({ count, users });
    } catch (err) {
        res.json(err);
    }
});

export { router as discoverRouter };
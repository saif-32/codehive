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

export { router as discoverRouter };
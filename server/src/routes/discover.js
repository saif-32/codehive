import { UserModel } from '../models/Users.js';
import express from 'express';
const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const response = await UserModel.find({}, 'firstName lastName');
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

export { router as discoverRouter };
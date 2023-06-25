import { UserModel } from '../models/Users.js';
import express from 'express';

const router = express.Router();

router.post("/profile-picture", async (req, res) => {
    try {
        const { userProfile, newImage } = req.body;
        const user = await UserModel.findOne({username: userProfile});

        let change = await UserModel.updateOne({username: userProfile},
            {
                $set:{
                    profilePicture: newImage['myFile'],
                }
        })
        res.status(200).json({ message: 'Image was succesfully uplaoded'});
    } catch (err) {
        console.log(err)
    }
});


export { router as uploadRouter };
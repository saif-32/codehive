import { UserModel } from '../models/Users.js';
import express from 'express';

const router = express.Router();

router.post("/profile-picture", async (req, res) => {
    try {
        const { email, newImage } = req.body;
        const user = await UserModel.findOne({email});

        let change = UserModel.updateOne({email},
            {
                $set:{
                    verified: false,
                    profilePicture: newImage['myFile'],
                }
        }).then(console.log("User was successfully verified."));

        console.log("complete")
        res.status(200).json({ message: 'Image was succesfully uplaoded'});
    } catch (err) {
        console.log(err)
    }
});


export { router as uploadRouter };
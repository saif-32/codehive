import { UserModel } from '../models/Users.js';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
  });

  router.post("/profile-picture", upload.single('myFile'), async (req, res) => {
    try {
      const { userProfile, newImage } = req.body;
      const user = await UserModel.findOne({ username: userProfile });
  
      let change = await UserModel.updateOne({ username: userProfile }, {
        $set: {
          profilePicture: newImage['myFile'],
        }
      });
  
      res.status(200).json({ message: 'Image was successfully uploaded' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


export { router as uploadRouter };
import express from 'express';
import jwt from 'jsonwebtoken';;
import { UserModel } from '../models/Users.js';
import { sendPasswordResetEmail } from './Email.js';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({email});

        if(!user)
        {
            return res.status(404).json({error: 'User not found '});
        }

        const token = jwt.sign({email: req.body.email}, "secret", {expiresIn: '12h'});

        UserModel.resetToken = token;
        UserModel.resetTokenExpiration = Date.now() + 43200000; // 12 hrs

        await UserModel.save();

        await sendPasswordResetEmail(email, token);

        res.status(200).json({ message: 'Password reset email sent'});

    } catch (error) {
        // Insert errors here
    }    
    
})
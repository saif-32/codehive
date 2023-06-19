import express from 'express';
import { UserModel } from '../models/Users.js';
import { sendPasswordResetEmail } from '../services/Email.js';

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
       // UserModel.resetTokenExpiration = Date.now() + 43200000; // 12 hrs

        console.log("Hello")
        UserModel.updateOne({email},
            {
                $set:{
                    resetToken: token,
                }
            }).then(console.log("User reset token was sent."));

        sendPasswordResetEmail(email, token);
        res.status(200).json({ message: 'Password reset email sent'});

    } catch (error) {
        // Insert errors here
    }    
})

router.post('/reset-password', async (req, res) => {
    console.log("hello")
    const {token} = req.body;
    console.log(token)
    res.status(200).json({ message: token});
});

export { router as passwordRouter };




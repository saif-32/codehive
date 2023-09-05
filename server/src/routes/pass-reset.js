import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';
import { sendPasswordResetEmail } from '../services/Email.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Checks if the email exist
    try {
        const user = await UserModel.findOne({email});

        // If the email doesn't exist, returns an error that is sent to the page
        if(!user)
        {
          console.log("Error")
          return res.status(404).json({error: 'User not found '});
        }

        // Creates the token 
        console.log("Hello")
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '12h'});

        console.log(token)

        console.log("Hello")

        // Sets resetToken to equal the generated token, and cues the sendPasswordReset email to send a pass reset mail
        UserModel.updateOne({email},
            {
                $set:{
                    resetToken: token,
                }
            }).then(console.log("User reset token was sent."));

        sendPasswordResetEmail(email, user.username, token);
        res.status(200).json({ message: 'Password reset email sent'});

    } catch (error) {
      res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }    
})

router.post("/verify-pass-token", async(req, res) => {
    const {username, token } = req.body;
    const user = await UserModel.findOne({username});
    
    if(!user) {
      return res.status(404).json({ Message: "This username was not found." });
    }
    if(!user.resetToken)
    {
      return res.json({Message: "Token was unable to be reset."});
    }
  
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decode)
      
      console.log("User token has been decoded.");
      return res.json({status: 'okay'});
    } catch (err) {
      return res.json({status: 'error'});
    }
  })

  router.post("/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        if (newPassword.length < 8 || newPassword.length > 20) {
            return res.status(400).json({ message: "Password length should be between 8 and 20 characters" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.updateOne({ username }, { $set: { password: hashedNewPassword }, $unset: { resetToken: 1 } });

        console.log("User successfully reset password.");
        res.json({ message: "Password reset successful" });

    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
  })

export { router as passwordRouter };
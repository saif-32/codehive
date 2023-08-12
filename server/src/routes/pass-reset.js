import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import { sendPasswordResetEmail } from '../services/Email.js';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '12h' });

        await UserModel.updateOne({ email }, { $set: { resetToken: token } });

        sendPasswordResetEmail(email, user.username, token);
        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
});

router.post("/verify-pass-token", async (req, res) => {
    const { username, token } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: "This username was not found." });
    }

    if (!user.resetToken) {
        return res.json({ message: "Token was unable to be reset." });
    }

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("User token has been verified.");
        return res.json({ status: 'okay' });
    } catch (err) {
        console.error("Token verification error:", err);
        return res.json({ status: 'error' });
    }
});

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
        console.error("Reset password error:", err);
        res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }
});

export { router as passwordRouter };

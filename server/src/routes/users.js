import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { UserModel } from '../models/Users.js';
import { verifyUserEmail } from '../services/Email.js'


const router = express.Router();

router.post("/register", async(req, res) => {
    const { firstName, lastName, username, email, password } = req.body; // User details are sent in from the frontend

    const checkUser = await UserModel.findOne({ username }); // Checks if username exists or not
    const checkEmail = await UserModel.findOne({ email }); // Checks if email exists or not

    if (checkUser) {
        return res.json({Message: "This username already exists."});
    }

    if (checkEmail) {
        return res.json({Message: "This email already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashes user password with 10 salt rounds.

    // Creates a new user
    const newUser = new UserModel({
        firstName, 
        lastName, 
        username, 
        email, 
        password: hashedPassword
    }); 
    
    const emailToken = jwt.sign({username: req.body.username}, "secret", {expiresIn: '12h'});
    verifyUserEmail(firstName, lastName, email, username, emailToken);


    newUser.save(); // Saves into database.

    res.json({Message: "User was registered successfully!" });
});

router.post("/login", async(req, res) => {
    const { username, password} = req.body; // User login information is sent in from the frontend
    const user = await UserModel.findOne({username}); // Attempts to find user, if user exists, info is saved in var user.
    if (!user) {
        return res.json({Message: "This username was not found." });
    }

    if (!user.verified) {
        return res.json("Please verify your email to login.")
    }

    const checkPassword = await bcrypt.compare(password, user.password); // Encrypts password and checks if correct

    if (!checkPassword) {
        return res.json({message: "Username or Password is incorrect. Please try again."})
    }

    const token = jwt.sign({id: user._id}, "secret"); // Creates a token for the user, need to create env variable.
    res.json({ token, userID: user._id});

})

router.post("/verify-email", async(req, res) => {
    const { username, token} = req.body;
    const user = await UserModel.findOne({username});

    if (!user) {
        return res.json({Message: "This username was not found." });
    }

    if (user.verified) {
        return res.json({Message: "This user was already verified." });
    }

    try{
        const decode = jwt.verify(token, "secret")
        console.log(decode)
        let change = UserModel.updateOne({username},
        {
            $set:{
                verified: true,
            }
        }).then(console.log("User was successfully verified."));
        return res.json({status: 'okay'});
    } catch (err) {
        return res.json({status: 'error'});
    }
})


export { router as userRouter };
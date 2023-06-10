import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport'
import passportLocalMongoose from 'passport-local-mongoose'
import { UserModel } from '../models/Users.js';
import { verifyUserEmail } from '../services/Email.js'

const router = express.Router();

router.post("/register", async(req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    try {
    const checkUser = await UserModel.findOne({ username }); // Checks if username exists or not
    const checkEmail = await UserModel.findOne({ email }); // Checks if email exists or not

    if (checkUser) {
        return res.json({Message: "This username already exists."});
    }

    if (checkEmail) {
        return res.json({Message: "This email already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashes user password with 10 salt rounds.

    const newUser = new UserModel({
        firstName, 
        lastName, 
        username, 
        email,
        password: hashedPassword
    }); 

    await newUser.save();
    
    const emailToken = jwt.sign({username: req.body.username}, "secret", {expiresIn: '12h'});
    verifyUserEmail(firstName, lastName, email, username, emailToken);

    res.json({Message: "User was registered successfully!" });
} catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: "An error occurred during registration. Please try again later." });
}
});


router.post("/login", async(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("Authenticating user...")

        if (err) throw err; // Error Occured

        if (!user){ // User Authentication Failed.
            console.log("Authentication Failed")
            return res.json({ message: 'Authentication Failed' });
        }
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            console.log("Successfully Authenticated");
            console.log(req.user)
            return res.json({status: 'okay'});
          });
        }
      })(req, res, next);
})

router.get("/user", (req, res) => {
    console.log(req.user)
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


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
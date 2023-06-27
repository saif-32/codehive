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

    if (!firstName || !lastName || !username || !email || !password) {
        return res.json({Message: "All-Fields-Required"});
      }

    try {
    const checkUser = await UserModel.findOne({ username }); // Checks if username exists or not
    const checkEmail = await UserModel.findOne({ email }); // Checks if email exists or not

    if (checkUser) {
        return res.json({Message: "Username-Exists"});
    }

    if (checkEmail) {
        return res.json({Message: "Email-Exists"});
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()]{8,20}$/;

    if (!passwordRegex.test(password)) {
        return res.json({ Message: "Password-Not-Strong" });
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

    return res.json({status: 'okay'});
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
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get('/logout', async(req, res, next) => {
    console.log("Running")
    console.log(req.user)
    req.logout(function(err) {
      if (err) { 
        console.log(err)
        return next(err); 
        }
      console.log("Succesfully logged out user.")
      res.json({ message: 'User logged out successfully' });
    });
  });



router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/register/autherror' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
});

router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/register/autherror' }),
  function(req, res) {
    res.redirect('http://localhost:3000');
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

router.post("/edit-account", async(req, res) => {
  const { username, settingsFirstName, settingsLastName, settingsUsername, settingsEmail } = req.body;
  const user = await UserModel.findOne({username});

  try{
      let change = UserModel.updateOne({username},
      {
          $set:{
              firstName: settingsFirstName,
              lastName: settingsLastName,
              username: settingsUsername,
              email: settingsEmail,
          }
      }).then(console.log("User succesfully edited account."));
      return res.json({status: 'okay'});
  } catch (err) {
      return res.json({status: 'error'});
  }
})

router.post("/edit-account/password", async(req, res) => {
  console.log("initiating password change")
  const { username, settingsOldPassword, settingsNewPassword, settingsConfirmNewPassword } = req.body;

  if (!username || !settingsOldPassword || !settingsNewPassword || !settingsConfirmNewPassword) {
    return res.json({Message: "All-Fields-Required"});
  }

  const user = await UserModel.findOne({username});

  try{
      const isMatch = await bcrypt.compare(settingsOldPassword, user.password);
      if (!isMatch) {
        return res.json({ Message: 'Incorrect old password' });
      }

      if (settingsNewPassword !== settingsConfirmNewPassword) {
        return res.json({ Message: 'New password and confirm password do not match' });
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()]{8,20}$/;

      if (!passwordRegex.test(settingsNewPassword)) {
          return res.json({ Message: "Password-Not-Strong" });
      }
      
      const hashedNewPassword = await bcrypt.hash(settingsNewPassword, 10);
      await UserModel.updateOne({ username }, { $set: { password: hashedNewPassword } });
  
      console.log("User successfully changed password.");
      return res.json({ status: 'okay' });

  } catch (err) {
      return res.json({status: 'error'});
  }
})

router.post("/add-friends", async(req, res) => {
  const { userId, friendId } = req.body;

  try{
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);
  
    user.friends.push(friend._id);
    await user.save();


    return res.json({status: 'okay'});

  } catch (err) {
      return res.json({status: 'error'});
  }
})

router.get("/get-friends", async(req, res) => {
  const { userId } = req.query;
  const user = await UserModel.findById(userId).populate('friends');
  res.json(user.friends);
});



export { router as userRouter };
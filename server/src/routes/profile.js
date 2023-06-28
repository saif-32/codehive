import express from "express";
import mongoose from "mongoose";
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/create", async (req, res) => {
    console.log("Backend submitting...")
    const {
    userUsername,
    userFirstName,
    userLastName,
    userBirthdayMonth,
    userBirthdayDay,
    userBirthdayYear,
    userGender,
    userUniversity,
    userGrade,
    programmingLanguages,
    interests,
    userSkillLevel
    } = req.body;

    const formattedLanguages = programmingLanguages.map((language) => {
      return language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
    });

    const formattedInterests = interests.map((interest) => {
      return interest.charAt(0).toUpperCase() + interest.slice(1).toLowerCase();
    });

    const user = await UserModel.findOne({ username: userUsername });
    if (!user) {
      console.log("USER NOT FOUND!")
      return res.json({ Message: "This username was not found." });
    }
  
    if (user.profileCompleted) {
      return res.json({ Message: "This profile was already completed. Display the edit page." });
    }
  
    const birthdate = new Date(userBirthdayYear, userBirthdayMonth - 1, userBirthdayDay);
    const today = new Date()
  
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--; // Reduce age by 1 if the birthday hasn't occurred yet this year
    }

    try{
        let change = UserModel.updateOne(
            {username: userUsername},
            {
              $set: {
              firstName: userFirstName,
              lastName: userLastName,
              birthdayMonth: userBirthdayMonth,
              birthdayDay: userBirthdayDay,
              birthdayYear: userBirthdayYear,
              age: age,
              gender: userGender,
              university: userUniversity,
              languages: formattedLanguages,
              interests: formattedInterests,
              grade: userGrade,
              skillLevel: userSkillLevel,
              profileCompleted: true,
              },
            }
          ).then(console.log("User succesfully created their profile."));
        return res.json({status: 'okay'});
    } catch (err) {
        return res.json({status: 'error'});
    }
    // Need to return a error/success and then create frontend page for if profilecompleted or not
});

router.post("/edit", async(req, res) =>{
    const profile = new ProfileModel(req.body);
    try {
        const response = await profile.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})


export { router as profileRouter };
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: false, default: ''},
    lastName: {type: String, required: false, default: ''},
    username: {type: String, required: false, unique: true},
    email: {type: String, default: '', unique: false},
    password: {type: String, required: false},
    birthdayMonth: {type: Number},
    birthdayDay: {type: Number},
    birthdayYear: {type: Number},
    age: {type: Number},
    gender: {type: String},
    university: {type: String}, // drop down menu for US Universities
    gradeLevel: {type: String}, // freshman-senior
    skillLevel: {type: String}, // novice-expert
    languages: [{type: String}], // drop down menu for programming languages
    interests: [{type: String}], // drop down menu for interests ? AI, Web Dev, Game Dev, etc
    profilePicture: {type: String, default:'https://cdn.discordapp.com/attachments/798251319847813200/1122589471565684816/download.jpeg'},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    verified: {type: Boolean, default: false},
    resetToken: {type: String},
    googleId:{type: String, required: false},
    githubId:{type: String, required: false},
    profileCompleted:{type: Boolean, default: false},
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate)

export const UserModel = mongoose.model("users", UserSchema); // Setting schema to a model (giving it a name)
// Allows other files to be able to see the schema

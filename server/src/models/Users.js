import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import findOrCreate from 'mongoose-findorcreate'

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    username: {type: String, required: false, unique: true},
    email: {type: String, trim: true, index: true, unique: true, sparse: true},
    password: {type: String, required: false},
    verified: {type: Boolean, default: false},
    googleId:{type: String, required: false},
    githubId:{type: String, required: false},
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate)

export const UserModel = mongoose.model("users", UserSchema); // Setting schema to a model (giving it a name)
// Allows other files to be able to see the schema


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verified: {type: Boolean, default: false}
});

export const UserModel = mongoose.model("users", UserSchema); // Setting schema to a model (giving it a name)
// Allows other files to be able to see the schema


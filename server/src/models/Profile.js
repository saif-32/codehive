import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    age: {type: Number},
    gender: {type: String},
    university: {type: String}, // drop down menu for US Universities
    gradeLevel: {type: String}, // freshman-senior
    skillLevel: {type: String}, // novice-expert
    languages: [{type: String}], // drop down menu for programming languages
    interests: [{type: String}], // drop down menu for interests ? AI, Web Dev, Game Dev, etc
    userProfile: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}
});

export const ProfileModel = mongoose.model("profiles", ProfileSchema);
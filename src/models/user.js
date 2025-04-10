const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 30
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address provided : " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong : " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },  
    gender: {
        type: String,
        validate(value){
            if(value !== "male" && value !== "female" && value !== "other"){
                throw new Error("Invalid gender data provided : " + value);   
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL provided : " + value);
            }
        }
    },
    about:{
        type: String,
        default: "Hey there! I am using DevTinder!"
    },
    skills:{
        type: [String]
    },
},  { timestamps: true });

module.exports =  mongoose.model("User", userSchema);

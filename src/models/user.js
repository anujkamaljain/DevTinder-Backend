const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
            const newvalue = value.toLowerCase();
            if(newvalue !== "male" && newvalue !== "female" && newvalue !== "other"){
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: "1d" }
      );
    return token;
}

userSchema.methods.validatePassword = async function(passwordEnteredByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordEnteredByUser, this.password);
    return isPasswordValid;
}

module.exports =  mongoose.model("User", userSchema);

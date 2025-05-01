const express = require("express");
const authRouter = express.Router();
const {
  validateSignUpData,
  validateLoginData,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userAuth = require("../middlewares/auth");

//signup API
authRouter.post("/signup", async (req, res) => {
  try {
    //validating user data before creating user
    validateSignUpData(req);

    const { firstName, lastName, password, emailId } = req.body;

    //checking if user already exists
    const userExists = await User.findOne({ emailId: emailId });
    if (userExists) {
      return res.status(400).send("User already exists.");
    }
    //encrypting password before saving to database
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User created successfully.", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    //validating login data entered by user
    validateLoginData(req);
    const { emailId, password } = req.body;
    //checking if user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Incorrect login credentials.");
    }
    //checking if password is correct
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //setting cookie for user session
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Incorrect login credentials.");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//logout API
authRouter.post("/logout", userAuth, async (req, res) => {
  //setting token value in cookie to null and expiring it immdeiately to logout the user.
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logged out successfully.");
});

module.exports = authRouter;

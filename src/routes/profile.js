const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const {
  ValidateProfileEditData,
  validateNewPassword,
} = require("../helpers/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//gets profile of the user after login
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//edit profile of the user
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    ValidateProfileEditData(req);
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} ${loggedInUser.lastName} your profile was updated successfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//edit password of the user
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loggedInUser = req.user;
    //validating old password before allowing the user to update new password. it isnt required because already userAuth is checking if user is loggedin or not but still for more security.
    const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid old password.");
    }
    validateNewPassword(newPassword);
    //hashing new password before saving to database
    loggedInUser.password = await bcrypt.hash(newPassword, 10);
    loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} your password is updated succesfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = profileRouter;

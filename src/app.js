const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const {
  validateSignUpData,
  validateLoginData,
} = require("./helpers/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();
const userAuth = require("./middlewares/auth");

//signup API
app.post("/signup", async (req, res) => {
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
    await user.save();
    res.send("User created successfully.");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//login API
app.post("/login", async (req, res) => {
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //setting cookie for user session
      //in real world application, we would set a JWT token here
      const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_TOKEN_KEY
      );
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Incorrect login credentials.");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//gets profile of the user after login
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed.", err);
  });

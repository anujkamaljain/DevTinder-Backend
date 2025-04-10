const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const validateSignUpData = require("./helpers/validation");
const bcrypt = require('bcrypt');

app.use(express.json());

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
      password: passwordHash
    });
    await user.save();
    res.send("User created successfully.");
  } catch (err) {
    res.status(400).send("ERROR : "+ err.message);
  }
});


//login API
app.post("/login", async (req,res) => {
  
})

//Get user by email or id from database
app.get("/user", async (req, res) => {
  if (req.body.emailId) {
    try {
      const user = await User.find({ emailId: req.body.emailId });
      if (!user) {
        return res.status(404).send("User not found.");
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(400).send("Something went wrong.");
    }
  } else {
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        return res.status(404).send("User not found.");
      } else {
        res.send(user);
      }
    } catch (err) {
      res.status(400).send("Something went wrong.");
    }
  }
});

//Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("No users found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//Delete user by id from database
app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found.");
    } else {
      res.send("User deleted successfully.");
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//Update user by id from database
app.patch("/user/:userId", async (req, res) => {
  const id = req.params?.userId;
  const data = req.body;

  try {
    const AllowedUpdates = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdatesAllowed = Object.keys(data).every((k) =>
      AllowedUpdates.includes(k)
    );
    if(!isUpdatesAllowed){
      throw new Error("Update not allowed.");
    }
    if(data.skills.length > 5){
      throw new Error("Cannot add more than 5 skills. Update Failed.");
    }
    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("User not found.");
    } else {
      res.send("User updated successfully.");
    }
  } catch (err) {
    res.status(400).send("Update failed : " + err.message);
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

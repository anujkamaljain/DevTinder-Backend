const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anujkamaljain:NSA03TepIjd2Mnc7@cluster0.ow9f29e.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name or last name are required.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address.");
  }
};

module.exports = { validateSignUpData, validateLoginData };

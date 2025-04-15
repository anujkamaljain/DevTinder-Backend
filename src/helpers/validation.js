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

const ValidateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about", "emailId"];
  const gender = req.body.gender?.toLowerCase();
  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });
  if(!isEditAllowed){
    throw new Error("Invalid edit fields.");
  }
  if(req.body.photoUrl && !validator.isURL(req.body.photoUrl)){
    throw new Error("Invalid photo URL.");
  }
  if(req.body.emailId && !validator.isEmail(req.body.emailId)){
    throw new Error("Invalid email address.");
  }
  if(req.body.skills && req.body.skills.length > 10){
    throw new Error("Cannot enter more than 10 skills.");
  }
  if(req.body.age && req.body.age < 18 || req.body.age > 100){
    throw new Error("Invalid age.");
  }
  if(req.body.about &&  !validator.isLength(req.body.about, {min: 1, max: 100})){
    throw new Error("Cannot enter more than 100 characters in about.");
  }
}

const validateNewPassword = (newPassword) => {
  if(!validator.isStrongPassword(newPassword)){
    throw new Error("Please Enter a strong new password.");
  }
}

module.exports = { validateSignUpData, validateLoginData, ValidateProfileEditData, validateNewPassword };

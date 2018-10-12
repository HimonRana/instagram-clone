const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwrod2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name validate length
  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be beetween 2 and 20 characters";
  }

  // Name empty
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  
  // Email validate
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Email empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Password validate length
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // Password empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  // Password2 match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }
  
  // Password2 empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};

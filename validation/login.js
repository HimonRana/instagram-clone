const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

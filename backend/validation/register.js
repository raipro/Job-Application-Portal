const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegistration(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is compulsory";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is compulsory";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "invalid email";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is compulsory";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is compulsory";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are compulsory";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};

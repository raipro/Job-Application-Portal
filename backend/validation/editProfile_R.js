const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateeditProfileR(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ""
  data.contactno = !isEmpty(data.contactno) ? data.contactno : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
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
  if (!Validator.isLength(data.contactno, { max: 10 })) {
    errors.contactno = "Contactno can be max 10 digits";
  }
  
  
  if (Validator.isEmpty(data.contactno)) {
    errors.password2 = "Contact no feild is compulsory";
  }
  else if (!Validator.isLength(data.contactno, { max: 10 })) {
        errors.contactno = "Contactno can be max 10 digits";
      }
  if (Validator.isEmpty(data.bio)) {
    errors.password2 = "Bio feild is compulsory";
  }
  else if (!Validator.isLength(data.bio, { max: 1000 })) {
    errors.bio = "Bio can be at most 250 words";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};

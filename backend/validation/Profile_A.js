const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateProfileA(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

//   for(var i=0;i<data.education.length;i++)
//   { 
//     data.education[i].InstitutionName = !isEmpty(data.InstitutionName) ? data.InstitutionName : "";
//     data.education[i].StartYear = !isEmpty(data.StartYear) ? data.StartYear : "";
//     data.education[i].EndYear = !isEmpty(data.EndYear) ? data.EndYear : "";
//     if(Validator.isEmpty(data.education[i].InstitutionName)) {
//         errors.education = "institution compulsory";
//     }
//     if(Validator.isEmpty(data.education[i].StartYear)) {
//         errors.education = "start year compulsory";
//     }
//   }
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
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are compulsory";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

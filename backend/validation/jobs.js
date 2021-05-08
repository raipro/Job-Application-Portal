const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatejobs(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  data.JobTitle = !isEmpty(data.JobTitle) ? data.JobTitle : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.applications = !isEmpty(data.applications) ? data.applications : "";
  data.positions = !isEmpty(data.positions) ? data.positions : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";     
// Name checks
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is compulsory";
  }
  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is compulsory";
  }
  else if(data.salary < 0)
  {
    errors.salary = "salary must be positive"
  }
  
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is compulsory";
  }
  else if (data.duration > 6 || data.duration < 0)
  {
    errors.duration = "invalid duration";
  }
  if (Validator.isEmpty(data.applications)) {
    errors.applications = "Applications field is compulsory";
  }
  if (Validator.isEmpty(data.positions)) {
    errors.positions = "Positions field is compulsory";
  }
  else if(data.positions > data.applications) {
    errors.positions = "max positions should be less than max applications"
  }
     
  if (Validator.isEmpty(data.JobTitle)) {
    errors.JobTitle = "JobTitle field is compulsory";
  }
  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "Deadline field is compulsory";
  }
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};
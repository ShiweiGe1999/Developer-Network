const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is Required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is Required!";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password Length must be between 6 and 30 characters!";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

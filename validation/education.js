const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldstudy = !isEmpty(data.fieldstudy) ? data.fieldstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  if (Validator.isEmpty(data.school))
    errors.school = "school field is required!";
  if (Validator.isEmpty(data.degree))
    errors.degree = "degree field is required!";
  if (Validator.isEmpty(data.from)) errors.from = "From field is required!";
  if (Validator.isEmpty(data.fieldstudy))
    errors.fieldstudy = "fieldstudy field is required!";
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

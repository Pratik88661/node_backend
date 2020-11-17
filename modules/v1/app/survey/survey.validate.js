const {
  check, body
} = require('express-validator');
const validator = require('../../../../helper/validator')
const surveyValidator = {};

// validate empty value
surveyValidator.validateEmpty = (field) => {
  return check(field).isString();
};

// validate enumeration
surveyValidator.verifyEnum = (field, options) => {
  return check(field).isIn(options);
}

surveyValidator.validateCreateUser = () => {
  return [
    body('firstName', validator.customMessage("isRequired", "first name")).exists().notEmpty().isString(),
    body('lastName', validator.customMessage("isRequired", "last name")).exists().notEmpty().isString(),
    body('email', validator.customMessage("isRequired", "email")).exists().notEmpty().isString(),
    body('email', l10n.t('INVALID_EMAIL')).isEmail(),
    body('password', validator.customMessage("isRequired", "password")).notEmpty().isString()
  ]
}
//login validators
surveyValidator.validateLogin = () => {
  return [
    body('mobileNumber', validator.customMessage("isRequired", "mobileNumber")).exists().notEmpty(),
    body('password', validator.customMessage("isRequired", "password")).exists().notEmpty().isString(),
    // body('deviceToken', validator.customMessage("isRequired", "deviceToken")).exists().notEmpty()
  ]
}

module.exports = surveyValidator;

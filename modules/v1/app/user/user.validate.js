const {
  check, body
} = require('express-validator');
const validator = require('../../../../helper/validator')
const userValidator = {};

userValidator.validateCreateUser = () => {
  return [
    body('firstName', validator.customMessage("isRequired", "first name")).exists().notEmpty().isString(),
    body('lastName', validator.customMessage("isRequired", "last name")).exists().notEmpty().isString(),
    body('email', validator.customMessage("isRequired", "email")).exists().notEmpty().isString(),
    body('email', l10n.t('INVALID_EMAIL')).isEmail(),
    body('password', validator.customMessage("isRequired", "password")).notEmpty().isString()
  ]
}
//login validators
userValidator.validateLogin = () => {
  return [
    body('email', validator.customMessage("isRequired", "email")).exists().notEmpty(),
    body('password', validator.customMessage("isRequired", "password")).exists().notEmpty().isString(),
  ]
}

userValidator.validateCreateSocialUser = () => {
 return [
  body('idToken', validator.customMessage("isRequired", "idToken")).exists().notEmpty(),
  body('authToken', validator.customMessage("isRequired", "authToken")).exists().notEmpty(),
  body('provider', validator.customMessage("isRequired", "provider")).exists().notEmpty(),
  body('email', validator.customMessage("isRequired", "email")).exists().notEmpty(),
  body('email', l10n.t('INVALID_EMAIL')).isEmail()
]
}

module.exports = userValidator;

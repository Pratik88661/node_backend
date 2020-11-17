// Dependencies
const express = require('express');
const userRoute = express.Router();
const userController = require('./user.controller')
const {
    validationResult,
  } = require('express-validator/check');
const userMiddleware = require('./user.middleware')
const userValidator = require('./user.validate')
const utils = require('../../../../helper/utils');
const {
    PAGE422
} = require('../../../../constants/common');

//middleware start
// signup middleware start
const signupMiddleware = [
    userValidator.validateCreateUser(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
    userMiddleware.emailExists,
    userController.createAccount,
];
userRoute.post('/signup', signupMiddleware);
//signup middleware end

//login middleware start
const loginMiddleware = [
  userValidator.validateLogin(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
    userMiddleware.isEmailExists,
    userController.login
];
userRoute.post('/login', loginMiddleware);
//login middleware end

const socialLoginMiddleware = [
  userValidator.validateCreateSocialUser(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
  userMiddleware.isGoogleAuthenticated,
  userMiddleware.isEmailExists,
  userController.socialLogin
];

userRoute.post('/socialLogin',socialLoginMiddleware)
module.exports = userRoute;



const utils = require('../../../../helper/utils');
const { ERROR400, SERVERERROR } = require('../../../../constants/common');
const userService = require('./user.service');
const { OAuth2Client } = require('google-auth-library');
const { GOOGLECLIENTID } = require('../../../../config/config');
const googleClient = new OAuth2Client(GOOGLECLIENTID);
const { SIGNUPTYPE } = require('../../../../constants/model');
const { response } = require('../../../../config/app');
const userMiddleware = {};

// Check email is exists
userMiddleware.emailExists = async (req, res, next) => {
  let {
    email,
  } = req.body;
  console.log(req.body);
  if (!email) {
    email = req.body.user.email
  }

  const user = await userService.getUserByEmail(email);

  if (!utils.empty(user)) {
    return res.status(ERROR400)
      .json({
        errors: {
          message: req.t('USER_EMAIL_EXISTS'),
          "body": "body",
          "params": "email"
        },
        status: false,
      });
  }
  next();
};


userMiddleware.isGoogleAuthenticated = async (req, res, next) => {
  try {
    const { provider, idToken } = req.body;

    if (provider === SIGNUPTYPE.GOOGLE.toUpperCase()) {
      googleClient.verifyIdToken({
        idToken: idToken,
        audience: GOOGLECLIENTID
      }).then(response => {
        req.userDetails = response;
        next();
      }).catch(error => {
        return res.status(ERROR400)
          .json({
            errors: error,
            status: false,
          });
      });

    } else {
      return res.status(ERROR400)
        .json({
          errors: {
            message: req.t('INVALID_LOGIN_PROVIDER')
          },
          status: false,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(SERVERERROR.CODE).json({
      errors: { message: req.t(SERVERERROR.MESSAGE) },
      "status": false
    });
  }
}
//is social user exist end
//check user not exists
userMiddleware.isEmailExists = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (utils.empty(user)) {
      req.isUserExist = false;
    } else {
      req.isUserExist = true;
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(SERVERERROR.CODE).json({
      errors: { message: req.t(SERVERERROR.MESSAGE) },
      "status": false
    });
  }

}



module.exports = userMiddleware;
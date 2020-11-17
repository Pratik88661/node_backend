const utils = require('../../../../helper/utils');
const { ERROR400 } = require('../../../../constants/common');
const surveyService = require('./survey.service');
const surveyMiddleware = {};

// Check email is exists
surveyMiddleware.emailExists = async (req, res, next) => {
  let {
    email,
  } = req.body;
  if (!email) {
    email = req.body.user.email
  }

  const user = await surveyService.getUserByEmail(email);

  if (!utils.empty(user)) {
    return res.status(ERROR400)
      .json({
        errors: {
          message: req.t('USER_EMAIL_EXISTS'),
          "body": "body",
          "params": "email"
        },
        status: 1,
      });
  }
  next();
};


//is social user exist end
//check user not exists
surveyMiddleware.emailDoesNotExists = async (req, res, next) => {
  let { email } = req.body;
  const user = await surveyService.getUserByEmail(email);
  if (utils.empty(user)) {
    return res.status(ERROR400)
      .json({
        errors: { message: req.t("USER_DOES_NOT_EXISTS") },
        status: 1,
      });
  }
  next();
}

//check user by mobile number
surveyMiddleware.isMobileNumberExist = async (req, res, next) => {
  let { mobileNumber } = req.body;
  const user = await surveyService.getUserByNumber(mobileNumber);
  if (utils.empty(user)) {
    return res.status(ERROR400)
      .json({
        errors: {
          message: req.t("USER_DOES_NOT_EXISTS"),
          "body": "body",
          "params": "mobileNumber"
        },
        status: 1,
      });
  }
  next();
}

//check token exists
surveyMiddleware.isUserExists = async (req, res, next) => {
  let { id } = req.body;
  if (!utils.empty(id)) {
    const user = await surveyService.getUserById(id);
    if (utils.empty(user)) {
      return res.status(ERROR400)
        .json({
          errors: {
            message: req.t("USER_DOES_NOT_EXISTS"),
            "body": "body",
            "params": "id"
          },
          status: 1,
        });
    }
  } else {
    return res.status(ERROR400).json({
      errors: {
        message: req.t("ENTER_VALID_TOKEN"),
        "body": "body",
        "params": "token"
      },
      status: 1,
    });
  }
  next();
}



module.exports = surveyMiddleware;
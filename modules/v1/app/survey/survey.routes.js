// Dependencies
const express = require('express');
const surveyRoute = express.Router();
const surveyController = require('./survey.controller')
const {
    validationResult,
  } = require('express-validator/check');
const surveyMiddleware = require('./survey.middleware')
const surveyValidator = require('./survey.validate')
const utils = require('../../../../helper/utils');
const auth = require('../../../../helper/auth');
const {
    PAGE422
} = require('../../../../constants/common');

const createSurveyMiddleware = [
  surveyValidator.validateEmpty('question'),
(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(PAGE422.CODE).json({
      errors: errors.array()[0]
    });
  }
  return next();
},
  // auth.isAuthenticatedUser,
  surveyController.createSurveyQuestions,
];
surveyRoute.post('/create-survey-questions', createSurveyMiddleware);

const fetchAllSurveyMiddleware = [
  surveyController.fetchAllSurveyQuestions,
];
surveyRoute.post('/fetch-all-survey-questions', fetchAllSurveyMiddleware);

const fetchSurveyMiddleware = [
  surveyValidator.validateEmpty('id'),
(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(PAGE422.CODE).json({
      errors: errors.array()[0]
    });
  }
  return next();
},
  surveyController.fetchSurveyQuestions,
];
surveyRoute.post('/:id', fetchSurveyMiddleware);

module.exports = surveyRoute;



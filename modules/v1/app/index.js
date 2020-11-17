// Dependencies
const express = require('express');
const appRoute = express.Router();

appRoute.use('/user', require('./user/user.routes'));
appRoute.use('/survey', require('./survey/survey.routes'));

module.exports = appRoute;

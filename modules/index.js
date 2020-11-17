// Dependencies
const express = require('express');

const moduleRoute = express.Router();

moduleRoute.use('/v1/app', require('./v1/app'));

module.exports = moduleRoute;

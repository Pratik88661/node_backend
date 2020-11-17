'use strict';
const Constants = require('../../constants/model');
const utils = require('../../helper/utils');
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "User first name"
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "User last name"
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: _.values(Constants.STATUS),
      allowNull: false
    },
    resetPasswordToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    resetPasswordExpIn: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    paranoid: true
  });
  users.associate = function (models) {
    // associations can be defined here
  };
  users.authenticate = (password, hasPassword) => {
    return utils.compare(password, hasPassword);
  }
  return users;
};
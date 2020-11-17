'use strict';
const _ = require('lodash');
const Constants = require('../../constants/model');
module.exports = (sequelize, DataTypes) => {
  const userSurvey = sequelize.define('user_survey', {
    userId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull:true
    },
    questionId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull:false
    },
    answer:{
      type: DataTypes.STRING,
      allowNull:false
    },
    description:{
      type: DataTypes.STRING,
    }
  }, {});
  userSurvey.associate = function(models) {
    // associations can be defined here
    models.users.hasOne(userSurvey, {
      foreignKey: 'userId'
    });
    userSurvey.belongsTo(models.users);
  };
  return userSurvey;
};
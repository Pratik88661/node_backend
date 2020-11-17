'use strict';
module.exports = (sequelize, DataTypes) => {
  const survey_questions = sequelize.define('survey_questions', {
    userId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull:true
    },
    question:DataTypes.STRING,
    optionA:DataTypes.STRING,
    optionB:DataTypes.STRING,
    optionC:DataTypes.STRING,
    optionD:DataTypes.STRING,
  }, {
    paranoid:true
  });
  survey_questions.associate = function(models) {
    // associations can be defined here
    models.users.hasMany(survey_questions, {
      foreignKey: 'userId'
    });
    survey_questions.belongsTo(models.users);
  };
  return survey_questions;
};
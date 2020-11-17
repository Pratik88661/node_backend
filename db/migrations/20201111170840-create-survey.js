'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('survey_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      userId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: {
          model: {
            tableName: 'users',
            key: 'id'
          }
        },
        allowNull:true
      },
      question:{
        type: Sequelize.STRING,
        allowNull:false
      },
      optionA:{
        type: Sequelize.STRING,
        allowNull:false
      },
      optionB:{
        type: Sequelize.STRING,
        allowNull:false
      },
      optionC:{
        type: Sequelize.STRING,
        allowNull:false
      },
      optionD:{
        type: Sequelize.STRING,
        allowNull:false
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('survey_questions');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_surveys', {
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
      questionId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: {
          model: {
            tableName: 'survey_questions',
            key: 'id'
          }
        },
        allowNull:false
      },
      answer:{
        type: Sequelize.STRING,
        allowNull:false
      },
      description:{
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('user_surveys');
  }
};
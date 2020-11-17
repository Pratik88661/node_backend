'use strict';
const _ = require('lodash');
const Constants = require('../../constants/model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED,
        comment:"Auto generated id"
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment:"User first name"
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment:"User last name"
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull:true
      },
      status: {
        type: Sequelize.ENUM,
        values: _.values(Constants.STATUS),
        allowNull: false,
        defaultValue:Constants.STATUS.ACTIVE
      },
      resetPasswordToken:{
        allowNull: true,
        type: Sequelize.STRING
      },
      resetPasswordExpIn:{
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
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
    },{
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
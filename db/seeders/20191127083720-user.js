'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    await queryInterface.bulkInsert('users', [{
      name: "pratik Mehta",
      email: "pratik@test.com",
      password: "$2b$10$VYzMsqHZIsrcv4QzLWAzIuQYmj.S7d.RLJV53Iw8NxZgAIlMukPwW",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
    
    return queryInterface

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('users', null, {});

  }
};

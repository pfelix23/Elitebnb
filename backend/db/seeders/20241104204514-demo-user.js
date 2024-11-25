'use strict';

const {User} = require('../models');
const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    hashedPassword: bcrypt.hashSync('password123', 10)
  },
  {
    username: 'jane_doe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    hashedPassword: bcrypt.hashSync('password123', 10)
  },
  {
    username: 'alice_smith',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    hashedPassword: bcrypt.hashSync('password123', 10)
  },
  {
    username: 'bob_johnson',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    hashedPassword: bcrypt.hashSync('password123', 10)
  },
  {
    username: 'charlie_brown',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    hashedPassword: bcrypt.hashSync('password123', 10)
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await User.bulkCreate(users, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: users.map(user => user.username)
    }, {});
  }
};
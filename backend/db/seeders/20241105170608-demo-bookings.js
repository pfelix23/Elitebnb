'use strict';

const {Booking} = require('../models');

const bookings = [
  {
    spotId: 1,  
    userId: 1,  
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-05')
  },
  {
    spotId: 2,  
    userId: 2,  
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-02-07')
  },
  {
    spotId: 3,  
    userId: 3,  
    startDate: new Date('2025-03-10'),
    endDate: new Date('2025-03-15')
  },
  {
    spotId: 4, 
    userId: 4,  
    startDate: new Date('2025-04-20'),
    endDate: new Date('2025-04-25')
  },
  {
    spotId: 5,  
    userId: 5,  
    startDate: new Date('2025-05-10'),
    endDate: new Date('2025-05-15')
  }
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
      await Booking.bulkCreate(bookings, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Bookings', {
      type: bookings.map(booking => booking.type)
    }, {});
  }
};

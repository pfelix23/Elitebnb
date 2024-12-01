'use strict';
const {Review} = require('../models');

const reviews = [
  {
    userId: 1, 
    spotId: 1, 
    review: 'Fantastic place! Will definitely stay again.',
    stars: 5
  },
  {
    userId: 2, 
    spotId: 2, 
    review: 'Nice location, but the room could use a little updating.',
    stars: 4
  },
  {
    userId: 3, 
    spotId: 3,
    review: 'The place was perfect for my trip. Clean and cozy!',
    stars: 5
  },
  {
    userId: 4, 
    spotId: 4, 
    review: 'Had a few issues with the amenities, but the view made up for it.',
    stars: 3
  },
  {
    userId: 5, 
    spotId: 5, 
    review: 'Loved the place, but it was a bit overpriced for what it offered.',
    stars: 4
  },
  {
    userId: 6,
    spotId: 5,
    review: 'Great spot, very cozy and well-located. The price was a little high, but the experience made it worthwhile.',
    stars: 4
  },
  {
    userId: 7,
    spotId: 5,
    review: 'Had a wonderful stay! The location was perfect, but I feel like the amenities could have been better for the price.',
    stars: 3
  },
  {
    userId: 8,
    spotId: 5,
    review: 'Fantastic experience overall, but the cost felt a bit steep for what you get. Still, would recommend!',
    stars: 4
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
    await Review.bulkCreate(reviews, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {
      type: reviews.map(review => review.type)
    }, {});
  }
};

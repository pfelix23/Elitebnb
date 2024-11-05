'use strict';

const {ReviewImage} = require('../models');

const reviewImages = [
  {
    reviewId: 1,  
    url: 'https://example.com/review1-image1.jpg'
  },
  {
    reviewId: 1,  
    url: 'https://example.com/review1-image2.jpg'
  },
  {
    reviewId: 2,  
    url: 'https://example.com/review2-image1.jpg'
  },
  {
    reviewId: 3,  
    url: 'https://example.com/review3-image1.jpg'
  },
  {
    reviewId: 4,  
    url: 'https://example.com/review4-image1.jpg'
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
      await ReviewImage.bulkCreate(reviewImages, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('ReviewImages', {
      type: reviewImages.map(reviewImage => reviewImage.type)
    }, {});
  }
};

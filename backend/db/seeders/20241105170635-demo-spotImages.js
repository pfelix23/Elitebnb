'use strict';

const {SpotImage} = require('../models');

const spotImages = [
  {
    spotId: 1,  
    url: 'https://example.com/spot1-image1.jpg',
    preview: true
  },
  {
    spotId: 2, 
    url: 'https://example.com/spot1-image2.jpg',
    preview: false
  },
  {
    spotId: 2,  
    url: 'https://example.com/spot2-image1.jpg',
    preview: true
  },
  {
    spotId: 3,  
    url: 'https://example.com/spot3-image1.jpg',
    preview: false
  },
  {
    spotId: 4,  
    url: 'https://example.com/spot4-image1.jpg',
    preview: true
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
      await SpotImage.bulkCreate(spotImages, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {
      type: spotImages.map(spotImage => spotImage.type)
    }, {});
  }
};

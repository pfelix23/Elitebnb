'use strict';

const {SpotImage} = require('../models');

const spotImages = [
  {
    spotId: 1,  
    url: '/SpotImages/Spot-1/Spot-1.webp',
    preview: true
  },
  {
    spotId: 1,  
    url: '/SpotImages/Spot-1/Spot-1b.webp',
    preview: false
  },
  {
    spotId: 1,  
    url: '/SpotImages/Spot-1/Spot-1c.webp',
    preview: false
  },
  {
    spotId: 1,  
    url: '/SpotImages/Spot-1/Spot-1d.webp',
    preview: false
  },
  {
    spotId: 2, 
    url: '/SpotImages/Spot-2/Spot-2.webp',
    preview: true
  },
  {
    spotId: 2,  
    url: '/SpotImages/Spot-2/Spot-2b.webp',
    preview: false
  },
  {
    spotId: 2,  
    url: '/SpotImages/Spot-2/Spot-2c.webp',
    preview: false
  },
  {
    spotId: 2,  
    url: '/SpotImages/Spot-2/Spot-2d.webp',
    preview: false
  },
  {
    spotId: 3,  
    url: '/SpotImages/Spot-3/Spot-3.webp',
    preview: true
  },
  {
    spotId: 3,  
    url: '/SpotImages/Spot-3/Spot-3b.webp',
    preview: false
  },
  {
    spotId: 3,  
    url: '/SpotImages/Spot-3/Spot-3c.webp',
    preview: false
  },
  {
    spotId: 3,  
    url: '/SpotImages/Spot-3/Spot-3d.webp',
    preview: false
  },
  {
    spotId: 4,  
    url: '/SpotImages/Spot-4/Spot-4.webp',
    preview: true
  },
  {
    spotId: 4,  
    url: '/SpotImages/Spot-4/Spot-4b.webp',
    preview: false
  },
  {
    spotId: 4,  
    url: '/SpotImages/Spot-4/Spot-4c.webp',
    preview: false
  },
  {
    spotId: 4,  
    url: '/SpotImages/Spot-4/Spot-4d.webp',
    preview: false
  },
  {
    spotId: 5,  
    url: '/SpotImages/Spot-5/Spot-5-Turkey.webp',
    preview: true
  },
  {
    spotId: 5,  
    url: '/SpotImages/Spot-5/Spot-5-Turkey-b.webp',
    preview: false
  },
  {
    spotId: 5,  
    url: '/SpotImages/Spot-5/Spot-5-Turkey-c.webp',
    preview: false
  },
  {
    spotId: 5,  
    url: '/SpotImages/Spot-5/Spot-5-Turkey-d.webp',
    preview: false
  },
  {
    spotId: 6,  
    url: '/SpotImages/Spot-6/Spot-6-Italy.webp',
    preview: true
  },
  {
    spotId: 6,  
    url: '/SpotImages/Spot-6/Spot-6-Italy-b.webp',
    preview: false
  },
  {
    spotId: 6,  
    url: '/SpotImages/Spot-6/Spot-6-Italy-c.webp',
    preview: false
  },
  {
    spotId: 6,  
    url: '/SpotImages/Spot-6/Spot-6-Italy-d.webp',
    preview: false
  },
  {
    spotId: 7,  
    url: '/SpotImages/Spot-7/Spot-7-Spain.webp',
    preview: true
  },
  {
    spotId: 7,  
    url: '/SpotImages/Spot-7/Spot-7-Spain-b.webp',
    preview: false
  },
  {
    spotId: 7,  
    url: '/SpotImages/Spot-7/Spot-7-Spain-c.webp',
    preview: false
  },
  {
    spotId: 7,  
    url: '/SpotImages/Spot-7/Spot-7-Spain-d.webp',
    preview: false
  },
  {
    spotId: 8,  
    url: '/SpotImages/Spot-8/Spot-8-Greece.webp',
    preview: true
  },
  {
    spotId: 8,  
    url: '/SpotImages/Spot-8/Spot-8-Greece-b.webp',
    preview: false
  },
  {
    spotId: 8,  
    url: '/SpotImages/Spot-8/Spot-8-Greece-c.webp',
    preview: false
  },
  {
    spotId: 8,  
    url: '/SpotImages/Spot-8/Spot-8-Greece-d.webp',
    preview: false
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

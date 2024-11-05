'use strict';

const {Spot} = require('../models');

const spots = [
  {
    ownerId: 1, 
    address: '123 Elm St',
    city: 'Springfield',
    state: 'IL',
    country: 'USA',
    lat: 39.7817,
    lng: -89.6501,
    name: 'Cozy Downtown Apartment',
    description: 'A cozy apartment in downtown Springfield. Great for a weekend getaway.',
    price: 120,
    numReviews: 3,
    avgRating: 4.5,
    previewImage: 'https://example.com/image1.jpg'
  },
  {
    ownerId: 2, 
    address: '456 Oak St',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    lat: 41.8781,
    lng: -87.6298,
    name: 'Charming Loft in Chicago',
    description: 'A stylish loft in the heart of Chicago. Perfect for a romantic retreat.',
    price: 150,
    numReviews: 10,
    avgRating: 4.8,
    previewImage: 'https://example.com/image2.jpg'
  },
  {
    ownerId: 3, 
    address: '789 Pine St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7128,
    lng: -74.0060,
    name: 'Modern Studio in NYC',
    description: 'A modern studio located in NYC with a beautiful view of the skyline.',
    price: 200,
    numReviews: 8,
    avgRating: 4.6,
    previewImage: 'https://example.com/image3.jpg'
  },
  {
    ownerId: 4, 
    address: '101 Maple St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Luxury Villa in LA',
    description: 'Experience the luxury of California living in this spacious villa.',
    price: 300,
    numReviews: 5,
    avgRating: 4.7,
    previewImage: 'https://example.com/image4.jpg'
  },
  {
    ownerId: 5, 
    address: '202 Birch St',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Quaint Cottage in SF',
    description: 'A quaint and charming cottage located in the heart of San Francisco.',
    price: 180,
    numReviews: 6,
    avgRating: 4.2,
    previewImage: 'https://example.com/image5.jpg'
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
    await Spot.bulkCreate(spots, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      type: spots.map(spot => spot.type)
    }, {});
  }
};

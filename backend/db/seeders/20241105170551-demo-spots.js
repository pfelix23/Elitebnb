'use strict';

const {Spot} = require('../models');

const spots = [
  {
    ownerId: 1, 
    address: '123 Elm St',
    city: 'Buffalo',
    state: 'NY',
    country: 'USA',
    lat: 39.7817,
    lng: -89.6501,
    name: 'Cozy Downtown Apartment',
    description: 'A cozy apartment in downtown Buffalo. Great for a weekend getaway.',
    price: 120,
    numReviews: 3,
    avgRating: 4.5,
    previewImage: '/SpotImages/Spot-1/Spot-1.webp'
  },
  {
    ownerId: 2, 
    address: '456 Oak St',
    city: 'Long Island',
    state: 'NY',
    country: 'USA',
    lat: 41.8781,
    lng: -87.6298,
    name: 'Charming Loft in New York',
    description: 'A stylish loft in the heart of New York. Perfect for a romantic retreat.',
    price: 150,
    numReviews: 10,
    avgRating: 4.8,
    previewImage: '/SpotImages/Spot-2/Spot-2.webp'
  },
  {
    ownerId: 3, 
    address: '789 Pine St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    lat: 40.7128,
    lng: -74.0060,
    name: 'Modern Villa in NYC',
    description: 'A modern studio located in NYC with a beautiful view of the skyline.',
    price: 200,
    numReviews: 8,
    avgRating: 4.6,
    previewImage: '/SpotImages/Spot-3/Spot-3.webp'
  },
  {
    ownerId: 4, 
    address: '101 Maple St',
    city: 'Poughkeepsie',
    state: 'NY',
    country: 'USA',
    lat: 34.0522,
    lng: -118.2437,
    name: 'Luxury Villa in upstate NY',
    description: 'Experience the luxury of Upstate NY living in this spacious villa.',
    price: 300,
    numReviews: 5,
    avgRating: 4.7,
    previewImage: '/SpotImages/Spot-4/Spot-4.webp'
  },
  {
    ownerId: 5, 
    address: '45 Ataturk Caddesi',
    city: 'Mahallesi',
    state: 'Istanbul',
    country: 'Turkey',
    lat: 37.7749,
    lng: -122.4194,
    name: 'Quaint Cottage in SF',
    description: 'A quaint and charming cottage located in the heart of San Francisco.',
    price: 180,
    numReviews: 6,
    avgRating: 4.2,
    previewImage: '/SpotImages/Spot-5/Spot-5-Turkey.webp'
  },
  {
    ownerId: 6,
    address: "123 Via Roma",
    city: "Via",
    state: "Rome",
    country: "Italy",
    lat: 37.7892,
    lng: -122.4018,
    name: "Modern Loft in SF",
    description: "A stylish and modern loft with stunning city views in the heart of San Francisco.",
    price: 220,
    numReviews: 8,
    avgRating: 4.5,
    previewImage: '/SpotImages/Spot-6/Spot-6-Italy.webp'
  },
  {
    ownerId: 7,
    address: " 45 Carrer de Pau Claris",
    city: "Pau Claris",
    state: "Barcelona",
    country: "Spain",
    lat: 37.7740,
    lng: -122.4195,
    name: "Luxury Penthouse in SF",
    description: "A luxurious penthouse offering panoramic views of the San Francisco skyline.",
    price: 350,
    numReviews: 12,
    avgRating: 4.8,
    previewImage: '/SpotImages/Spot-7/Spot-7-Spain.webp'
  },
  {
    ownerId: 8,
    address: "15 Agiou Nikolaou",
    city: "Nikolaou",
    state: "Thessaloniki",
    country: "Greece",
    lat: 37.8020,
    lng: -122.4208,
    name: "Cozy Apartment by the Bay",
    description: "A cozy, waterfront apartment perfect for relaxing and enjoying the beauty of the bay.",
    price: 150,
    numReviews: 10,
    avgRating: 4.3,
    previewImage: '/SpotImages/Spot-8/Spot-8-Greece.webp'
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

'use strict';

const {SpotImage} = require('../models');

const spotImages = [
  {
    spotId: 1,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-959493006014888753/original/6e4e417f-25e3-4578-941e-42fdd68a3971.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 1,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-959493006014888753/original/1322528f-0abb-4f3d-96eb-d5f0e3779f46.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 1,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-959493006014888753/original/6744706d-ded9-45e6-91e9-8b0e5100bff8.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 1,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-959493006014888753/original/5f1c8783-9ab4-47c8-8572-bc63c2251c95.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 1,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-959493006014888753/original/6d6c7ee2-9b18-4b89-8574-14d69d4d9d9f.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 2,  
    url: 'https://a0.muscache.com/im/pictures/d02b6794-2024-491f-a2e3-d8b56e3ef5a4.jpg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 2,  
    url: 'https://a0.muscache.com/im/pictures/5832b7e2-5611-4f62-aa8e-a3d1e1362773.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 2,  
    url: 'https://a0.muscache.com/im/pictures/bd581ed1-f910-47e3-aa8b-197328b3ae08.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 2,  
    url: 'https://a0.muscache.com/im/pictures/5a9f61f2-0f93-4290-ab7d-e6bb5635ef2e.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 2,  
    url: 'https://a0.muscache.com/im/pictures/186de821-eafa-4d91-affb-6b3d92d5d016.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 3,  
    url: 'https://a0.muscache.com/im/pictures/29157f7d-2ea0-46a1-bcd4-5a8c2c6538a1.jpg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 3,  
    url: 'https://a0.muscache.com/im/pictures/c7eb5b9b-f7f2-46ff-9290-e5c386e3ca0f.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 3,  
    url: 'https://a0.muscache.com/im/pictures/c7eb5b9b-f7f2-46ff-9290-e5c386e3ca0f.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 3,  
    url: 'https://a0.muscache.com/im/pictures/c6aaac6c-87b1-4d90-914c-2f1cb539a4b2.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 3,  
    url: 'https://a0.muscache.com/im/pictures/3199a143-52a1-4f4d-bef1-aabd9ac98fde.jpg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 4,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034816792814888205/original/a86e80aa-5789-439a-ba21-7233f2a4c457.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 4,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034816792814888205/original/5b2ff94e-4b39-4494-9973-8efdb2b12e6e.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 4,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034816792814888205/original/4df3dee2-9686-480f-8770-166e84c04936.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 4,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034816792814888205/original/e46c9de7-c859-4dd0-943a-c5cb5091831b.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 4,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1034816792814888205/original/ec59cb99-32f2-4df6-95d3-642dbeeb3e39.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 5,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-956413615947285538/original/6a01991d-8a0b-4b28-b3b7-cc77b5728347.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 5,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-956413615947285538/original/7c8e8e62-038c-4895-87f6-fbb758e15890.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 5,  
    url: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-956413615947285538/original/4ce14634-d086-48ef-84f9-500c92b8ba22.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 5,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-977191935069697987/original/1d454381-b0de-45e7-901f-0417d101f8b2.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 5,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-956413615947285538/original/b5c7cdee-6331-4acc-b383-c193cc5fe3a3.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 6,  
    url: 'https://a0.muscache.com/im/pictures/5e14c015-abe6-4305-87d5-95511fe1a6fe.jpg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 6,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjcyNzAzNTk%3D/original/5a12304d-7227-44d4-9ce5-aba983d424e6.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 6,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjcyNzAzNTk%3D/original/02fec38b-5963-4ac3-a5be-dcd9500ebf9a.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 6,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjcyNzAzNTk%3D/original/38f33478-d24d-4265-a3a4-8e40d9e9c202.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 6,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjcyNzAzNTk%3D/original/b33f5d05-d923-470e-94a1-2655366d1c4b.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 7,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-801967691079448534/original/5c38e997-3545-4cc2-8dbf-55f1643c68c7.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 7,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-801967691079448534/original/59ddc90d-54f0-4a02-bbbb-573975f00b21.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 7,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-801967691079448534/original/a20620d0-d803-4708-af0f-182bac95be9b.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 7,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-801967691079448534/original/ab7255b3-52ea-4e9d-b2ac-22d7eb9c22ab.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 7,  
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-801967691079448534/original/d2b5aa21-e317-46d2-bfb1-dbd339949c79.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 8,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1ODkyNzM%3D/original/718304ca-a9f9-46e1-aea2-a732d1e4c6a2.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    spotId: 8,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1ODkyNzM%3D/original/b11cba5d-9747-4b40-be1d-f6ecf985c8af.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 8,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1ODkyNzM%3D/original/127534c2-a6b6-4a39-8c8e-fd790cb0a604.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 8,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1ODkyNzM%3D/original/8e71f4f2-a340-49fe-97c5-f7e132a2a33b.jpeg?im_w=720&im_format=avif',
    preview: false
  },
  {
    spotId: 8,  
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU1ODkyNzM%3D/original/22f6cc83-3519-4afa-9571-feb1e7243cea.jpeg?im_w=720&im_format=avif',
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

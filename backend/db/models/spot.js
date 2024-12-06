'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {as: 'Owner',foreignKey: 'ownerId', onDelete: 'CASCADE'});
      Spot.belongsToMany(models.User, {through: models.Booking, foreignKey: 'spotId', onDelete: 'CASCADE' });
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'})
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    state:  {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    country:  {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type:DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numReviews: DataTypes.INTEGER,
    avgRating: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
     attributes: {include: ['id', 'ownerId']}
    }
  });
  return Spot;
};
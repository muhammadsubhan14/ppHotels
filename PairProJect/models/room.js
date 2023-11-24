'use strict';
const rupiah = require("../helpers/helper");


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    
    get rupiah() {
      return rupiah.formatCurrency(this.price);
    }


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Status)
      
      Room.belongsToMany(models.Room, {
        through: "transaction",
        foreignKey: "RoomId",
        as: "IdRoom"
      })
      // define association here
    }
  }
  Room.init({
    roomNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },

    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },

    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },

    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
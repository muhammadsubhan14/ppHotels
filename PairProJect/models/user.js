'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
const sendEmailAfterUserCreation= require('../helpers/nodeMailer')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsToMany(models.Room, {
      //   through: "transaction",
      //   foreignKey: "UserId",
      //   as: "IdUser"
      // })
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true
      }
    }
  }, {
    hooks:{
      beforeCreate(instance,option){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        instance.password=hash
      },
      afterCreate(instance, options) {
          // Send email using Nodemailer after user creation
          sendEmailAfterUserCreation(instance.email);
        },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
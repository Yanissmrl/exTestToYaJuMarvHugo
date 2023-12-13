'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {      
      // define association here
    }
  };
  User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address'
            }
        }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "You must enter Password" }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
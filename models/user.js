'use strict';
const {
  Model
} = require('sequelize');
const { isBefore } = require('date-fns');
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
  }
  User.init({
    firstName: {
      field: 'firs_name',
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        idDate: true,
        isValidDate(value) {
          if (isBefore(new Date(), new Date(value))) {
            throw new Error('check your birthday');
          }
        }
      }
    },
    isMale: {
      field: 'is_male',
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};
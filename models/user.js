'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      //1 user 1 asisten
      User.hasOne(models.Asisten, {
        foreignKey: "user",
        as: "Asisten"
      })

      User.belongsTo(models.Role, {
        foreignKey: "role",
        as: "Role"
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordSalt: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
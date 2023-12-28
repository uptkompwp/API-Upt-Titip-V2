'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asisten extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Asisten.belongsTo(models.User, {
        foreignKey: "user",
        as: "userData"
      })
    }
  }
  Asisten.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    jk: DataTypes.STRING,
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Asisten',
  });
  return Asisten;
};
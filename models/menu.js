'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init({
    nama_menu: DataTypes.STRING,
    tipe_menu: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    mitra: {
      type: DataTypes.INTEGER,
      references: {
        model: "Mitras",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};
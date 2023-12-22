'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tr_pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tr_pemesanan.init({
    pemesan: {
      type: DataTypes.INTEGER,
      references: {
        model: "Asistens",
        key: "id",
      },
    },
    menu: {
      type: DataTypes.INTEGER,
      references: {
        model: "Menus",
        key: "id",
      },
    },
    jumlah: DataTypes.INTEGER,
    total_harga: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tr_pemesanan',
  });
  return Tr_pemesanan;
};
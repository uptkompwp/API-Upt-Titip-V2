'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mitra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mitra.belongsTo(models.User, {
        foreignKey: "user"
      })

      Mitra.hasMany(models.Menu, {
        foreignKey: "mitra",
        as: "menuData"
      })
    }
  }
  Mitra.init({
    nama_mitra: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Mitra',
  });
  return Mitra;
};
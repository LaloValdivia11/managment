const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development);

const NotificacionesUsarios = sequelize.define('NotificacionesUsuarios', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  descripcion: {
    type: DataTypes.STRING
  },
  fkUser: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
});


module.exports = NotificacionesUsarios;

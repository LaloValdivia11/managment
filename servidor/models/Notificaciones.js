// models/Notificacion.js
const { DataTypes , Sequelize} = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development); // Asegúrate de importar la instancia de Sequelize ya configurada

const Notificacion = sequelize.define('Notificacion', {
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

module.exports = Notificacion;

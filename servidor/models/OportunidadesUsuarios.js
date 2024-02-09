const { DataTypes , Sequelize } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development); // Asegúrate de importar la instancia de Sequelize ya configurada

const OportunidadesUsuarios = sequelize.define('OportunidadesUsuarios', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameUsuario: {
    type: DataTypes.STRING
  },
  Inversion: {
    type: DataTypes.INTEGER
  },
  fkUser: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fkOportunidadUsuario :{
    type: DataTypes.INTEGER,
    allowNull: true,
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

  
module.exports = OportunidadesUsuarios;

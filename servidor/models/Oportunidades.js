const { DataTypes , Sequelize } = require('sequelize');
const config = require('../config/config.json');
const sequelize = new Sequelize(config.development); // Asegúrate de importar la instancia de Sequelize ya configurada

const Oportunidades = sequelize.define('Oportunidades', {
  Id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  NameOpportunities: {
    type: DataTypes.STRING
  },
  TotalAmount: {
    type: DataTypes.INTEGER
  },
  fkUser: {
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

/***
sequelize.sync({ force: true }).then(async () => {
  // Create a new user
  const newOportunidad1 = await Oportunidades.create({
    NameOpportunities: 'Proyecto de energía solar para contribuir a la sostenibilidad ambiental',
    TotalAmount : 150000.00
  });

  const newOportunidad2 = await Oportunidades.create({
    NameOpportunities: 'Inversión en una franquicia de alimentos con historial exitoso',
    TotalAmount : 50000.00
  });

  const newOportunidad3 = await Oportunidades.create({
    NameOpportunities: 'Plataforma de préstamos P2P que ofrece rendimientos competitivos',
    TotalAmount :50000.00
  });
  

  const newOportunidad4 = await Oportunidades.create({
    NameOpportunities: 'Inversión en un proyecto agrícola que utiliza prácticas sostenible',
    TotalAmount : 120000.00
  });


  const newOportunidad5 = await Oportunidades.create({
    NameOpportunities: 'Participación en una operación de minería de criptomonedas',
    TotalAmount : 250000.00
  });

  const newOportunidad6 = await Oportunidades.create({
    NameOpportunities: 'Financiamiento para el desarrollo de una aplicación móvil prometedora.',
    TotalAmount : 70000.00
  });

  const newOportunidad7 = await Oportunidades.create({
    NameOpportunities: 'Proyecto de fabricación de dispositivos electrónicos de última generación',
    TotalAmount :180000.00
  });

  const newOportunidad8 = await Oportunidades.create({
    NameOpportunities: 'Participación en una empresa dedicada al comercio internacional de productos.',
    TotalAmount : 300000.00
  });

  const newOportunidad9 = await Oportunidades.create({
    NameOpportunities: 'Plataforma de educación en línea con enfoque en cursos especializados',
    TotalAmount : 90000.00
  });

});
*/
  
module.exports = Oportunidades;

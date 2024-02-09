'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Oportunidades', 'fkUser')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Oportunidades', 'fkUser',{
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true,
  });
  }
};

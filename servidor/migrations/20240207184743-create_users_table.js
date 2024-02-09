'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },                                                                    
      LastName : {
        type : Sequelize.STRING,
        allowNull: false,
      },
      BirthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      Password :{
        type: Sequelize.STRING,
        allowNull: false,
      },
      Amount :{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

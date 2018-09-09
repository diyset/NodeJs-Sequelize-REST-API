'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      codeJabatan: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'list_jabatans',
          key: 'id',
          as: 'codeJabatan',
        },
      },
      alamatId:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model: 'alamats',
          key:'id',
          as:'alamatId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
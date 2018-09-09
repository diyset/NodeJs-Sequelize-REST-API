'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete: 'CASCADE',
        references:{
          model: 'item_products',
          key:'id',
          as: 'itemId'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      tanggal_order: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelte: 'CASCADE',
        references:{
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      status_order: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListOrders');
  }
};
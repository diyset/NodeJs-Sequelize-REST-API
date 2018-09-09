'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TipeItems',[{
      id: 1,
      namaTipe:'Kendaraan',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id:2,
      namaTipe:'Barang - Elektronik',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id:3,
      namaTipe: 'Barang - Pakaian',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id:4,
      namaTipe: 'Bahan - Baku',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id:5,
      namaTipe: 'Furniture',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('TipeItems', null, {});
  }
};

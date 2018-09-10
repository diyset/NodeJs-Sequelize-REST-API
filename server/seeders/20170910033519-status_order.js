'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('status_orders',[{
     id: 1,
     name_status:'Waiting Payment',
     createdAt: new Date(),
      updatedAt: new Date()
   },{
     id:2,
     name_status:'Payment',
     createdAt: new Date(),
      updatedAt: new Date()
   },{
     id:3,
     name_status:'Shipping',
     createdAt: new Date(),
      updatedAt: new Date()
   },{
     id:4,
     name_status:'Delivery',
     createdAt: new Date(),
      updatedAt: new Date()
   },{
     id:5,
     name_status:'Done!',
     createdAt: new Date(),
      updatedAt: new Date()
   }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('status_orders', null, {});

  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListOrder = sequelize.define('ListOrder', {
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    tanggal_order: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    codeStatus: DataTypes.INTEGER
  }, {});
  ListOrder.associate = function(models) {
    // associations can be defined here
    ListOrder.belongsTo(models.User,{
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'users'
    })
    ListOrder.belongsTo(models.status_order,{
      foreignKey:'codeStatus',
      targetKey: 'id',
      as: 'statusOrder'
    })
  };
  return ListOrder;
};
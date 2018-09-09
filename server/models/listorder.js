'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListOrder = sequelize.define('ListOrder', {
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    tanggal_order: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    status_order: DataTypes.STRING
  }, {});
  ListOrder.associate = function(models) {
    // associations can be defined here
    ListOrder.belongsTo(models.User,{
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'users'
    })
  };
  return ListOrder;
};
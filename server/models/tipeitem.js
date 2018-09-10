'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipeItem = sequelize.define('TipeItem', {
    namaTipe: DataTypes.STRING
  }, {});
  TipeItem.associate = function (models) {
    // associations can be defined here
    TipeItem.belongsTo(models.item_product, {
      foreignKey: 'id',
      targetKey: 'tipe_item',
      as: 'tipeItems'
    })
  };
  return TipeItem;
};
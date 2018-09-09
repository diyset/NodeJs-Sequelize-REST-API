'use strict';
module.exports = (sequelize, DataTypes) => {
  const item_product = sequelize.define('item_product', {
    namaproduct: DataTypes.STRING,
    tipe_item: DataTypes.INTEGER,
    harga: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER
  }, {});
  item_product.associate = function(models) {
  //   // associations can be defined here
  //   item_product.belongsTo(models.ListOrder, {
  //     foreignKey: 'id',
  //     targetKey: 'itemId',
  //     as: 'itemsProduct'
  //   })
    item_product.belongsTo(models.TipeItem,{
      foreignKey: 'tipe_item',
      targetKey: 'id',
      as: 'tipeItem'
    })
  };
  return item_product;
};
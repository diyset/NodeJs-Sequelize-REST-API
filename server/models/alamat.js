'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alamat = sequelize.define('Alamat', {
    address: DataTypes.STRING,
    kota: DataTypes.STRING,
    negara: DataTypes.STRING,
    kodepos: DataTypes.INTEGER
  }, {});
  Alamat.associate = function(models) {
    // associations can be defined here
    Alamat.belongsTo(models.User, {
      foreignKey: 'id',
      targetKey:'id',
      as: 'alamats'
    })
  };
  return Alamat;
};
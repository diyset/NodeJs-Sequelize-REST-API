'use strict';
module.exports = (sequelize, DataTypes) => {
  const list_jabatan = sequelize.define('list_jabatan', {
    jobname: DataTypes.STRING,
    salary: DataTypes.DOUBLE
  }, {});
  list_jabatan.associate = function(models) {
    // associations can be defined here
    list_jabatan.belongsTo(models.User, {
      foreignKey: 'id',
      targetKey: 'id',
      as: 'listJabatans'
    })
  };
  return list_jabatan;
};
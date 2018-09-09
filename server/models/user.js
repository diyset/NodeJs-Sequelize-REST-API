'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    
  }, {});
  User.associate = function(models) {
    // associations can be defined here
 
  //  User.hasOne(models.list_jabatan, {
  //   foreignKey: 'id',
  //   targetKey: 'codeJabatan',
  // })
  User.belongsTo(models.Todo,{
    foreignKey: 'id',
    targetKey: 'userId',
    as: 'listTodos'
  })
  User.belongsTo(models.list_jabatan, {
    foreignKey: 'codeJabatan',
    targetKey: 'id',
    as:'jabatans'
  })
  User.belongsTo(models.Alamat, {
    foreignKey: 'alamatId',
    targetKey: 'id',
    as: 'alamats'
  })
  User.hasMany(models.ListOrder, {
    foreignKey: 'userId',
    targetKey: 'id',
    as:'orders'
  })
  };
  return User;
};
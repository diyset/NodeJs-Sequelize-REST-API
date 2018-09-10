'use strict';
module.exports = (sequelize, DataTypes) => {
  const status_order = sequelize.define('status_order', {
    name_status: DataTypes.STRING
  }, {});
  status_order.associate = function(models) {
    // associations can be defined here
  };
  return status_order;
};
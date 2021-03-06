'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,

  }, {});
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems',
    })
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  };
  return Todo;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    content: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: 
    {  
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    }, {});
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    })
  };
  return TodoItem;
};
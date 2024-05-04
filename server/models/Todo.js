"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate({User}) {
      // define association here
      //default foreign key is UserId
      this.belongsTo(User,{foreignKey:'userId',as:'user'})
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId:undefined };
    }
  }
  Todo.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "todos",
      modelName: "Todo",
    }
  );
  return Todo;
};

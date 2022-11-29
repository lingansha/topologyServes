const Model = require('./util.js')
const { DataTypes } = require("sequelize");
const Component = Model("component", {
  userId:{type:DataTypes.INTEGER,allowNull: false,},
  name:{type:DataTypes.TEXT,allowNull: false,},
  text: DataTypes.TEXT,
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  height:{
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  data:{
    type:DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = Component
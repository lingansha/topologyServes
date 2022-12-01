const Model = require('./util.js')
const { DataTypes } = require("sequelize");
const Component = Model("component", {
  userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  name:{type:DataTypes.TEXT,allowNull: false,},
  text: DataTypes.TEXT,
  width: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  bgimage:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  height:{
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  data:{
    type:DataTypes.JSON
  }
});

module.exports = Component
const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const Animate = Model("Animate", {
  userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  name: DataTypes.TEXT,
  frames: DataTypes.JSON
});
module.exports = Animate
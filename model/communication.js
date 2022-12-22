const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const Communication = Model("Communication", {
    userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  name:{type:DataTypes.TEXT,allowNull: false,},
  data: DataTypes.JSON
});
module.exports = Communication
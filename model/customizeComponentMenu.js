const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const Customize_Component_Menu = Model("Customize_Component_Menu", {
  userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  name:DataTypes.TEXT,
  expand:{
    type: DataTypes.BOOLEAN,
    defaultValue:true
  },
  show:{
    type: DataTypes.BOOLEAN,
    defaultValue:true
  }
});
module.exports = Customize_Component_Menu
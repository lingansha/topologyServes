const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const Uploads = Model("Uploads", {
    userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  filename: {
    type:DataTypes.TEXT
  },
  pathname: {
    type:DataTypes.TEXT
  },
});
module.exports = Uploads
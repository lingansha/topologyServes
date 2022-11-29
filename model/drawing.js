const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const Drawing = Model("Drawing", {
    userId:{
    type:DataTypes.TEXT,
    allowNull: false,
  },
  drawingId: {
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull: false,
  },
  data: DataTypes.TEXT
});
module.exports = Drawing
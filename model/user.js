const Model = require('./util.js')
const { DataTypes} = require("sequelize");
const User = Model("user", {
  userId:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    allowNull: false,
  },
  username: DataTypes.TEXT,
  avatar: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  password:DataTypes.TEXT,
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
});
module.exports = User
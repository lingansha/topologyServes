
const { Sequelize} = require("sequelize");
// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('topo', 'root', 'root', {
    host: 'localhost',
    dialect:'mysql'
  });
const Model = (name,parmas)=>{
    console.log("==进入MODEL==")
    return sequelize.define(name,parmas);
}
(async () => {
  await sequelize.sync({ force: false });
  // 这里是代码
})();
module.exports = Model
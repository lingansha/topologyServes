const router = require('./index')
const { DataTypes } = require("Sequelize");
const Component = require('../model/component.js')
const Customize_Component_Menu = require('../model/customizeComponentMenu.js')
Customize_Component_Menu.hasMany(Component, {
  foreignKey:{
    name: 'menuId',
  },
  targetKey:'id'
});
Component.belongsTo(Customize_Component_Menu);
router.get('/system', function (ctx, next) {
  ctx.body = 'this is a Customize_Component_Menu component!'
})
//创建栏目接口
router.post('/system/customize_component_menu/add', async (ctx, next) => {
  try {
    const {name } = ctx.request.body
    if (!name) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    await Customize_Component_Menu.create({ userId:ctx.req.userInfo.userId, name });
    ctx.body = {
      code: 200,
      msg: '新增成功',
    }
  } catch (e) {
    ctx.throw(e)
  }
})
//获取栏目列表
router.get('/system/customize_component_menu/list', async (ctx) => {
  console.log("test")
  try {
    const {userId} = ctx.req.userInfo
    let list = await Customize_Component_Menu.findAll({
      where: {userId},
      include: {
        model: Component
      }
    });
    ctx.body = {
      code: 200,
      data:list
    }
  } catch (e) {
    ctx.throw(e)
  }
})
//创建组件
router.post('/system/customize_component_menu/create_component', async (ctx) => {
  try {
    const {menuId,name,text,width,height,bgimage,data} = ctx.request.body
    if (!menuId || !name||!text||!width||!height||!bgimage||!data) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    await Component.create({userId:ctx.req.userInfo.userId,menuId,name,text,width,height,bgimage,data});
    ctx.body = {
      code: 200,
      msg:"创建成功"
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router

const router = require('./index')
const { DataTypes } = require("Sequelize");
const Component = require('../model/component.js')
const Customize_Component_Menu = require('../model/customizeComponentMenu.js')
const Animate = require('../model/animate.js')
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
//创建动画
router.post('/system/customize_component_menu/create_animate', async (ctx) => {
  try {
    const {name,frames} = ctx.request.body
    if (!frames || !name) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    await Animate.create({userId:ctx.req.userInfo.userId,name,frames});
    ctx.body = {
      code: 200,
      msg:"创建成功"
    }
  } catch (e) {
    ctx.throw(e)
  }
})
//创建动画
router.post('/system/customize_component_menu/delete_animate', async (ctx) => {
  try {
    const {id} = ctx.request.body
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    await Animate.destroy({
      where: {
        id
      }
    });
    ctx.body = {
      code: 200,
      msg:"删除成功"
    }
  } catch (e) {
    ctx.throw(e)
  }
})
//获取动画列表
router.get('/system/customize_component_menu/animate_list', async (ctx) => {
  try {
    let list = await Animate.findAll({
      where: {userId:ctx.req.userInfo.userId}
    });
    ctx.body = {
      code: 200,
      data:list
    }
  } catch (e) {
    ctx.throw(e)
  }
})
//获取动画列表分页
router.get('/system/customize_component_menu/animate_list_page', async (ctx) => {
  try {
    let currentPage = parseInt(ctx.query.currentPage) || 1 //默认为1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    let list = await Animate.findAll({
      where: {userId:ctx.req.userInfo.userId},
      offset: (currentPage-1)*pageSize, 
      limit: pageSize
    });
    let count = await Animate.count({userId:ctx.req.userInfo.userId});
    ctx.body = {
      code: 200,
      data:{
        list,
        total:count
      }
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router

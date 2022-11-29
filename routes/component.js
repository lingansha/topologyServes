const router = require('./index')
const Component = require('../model/component.js')

router.get('/system', function (ctx, next) {
  ctx.body = 'this is a users component!'
})
router.get('/system/custom-component',async function (ctx, next) {
  const res = await Component.findAll();
  console.log("All res:", JSON.stringify(res, null, 2));
  ctx.body = 'this is a users component!'
})

module.exports = router

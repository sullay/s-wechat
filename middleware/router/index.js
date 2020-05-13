const Router = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const router = new Router({ prefix: '/api' })
const SECRET = require('../../config/index').SECRET
// 示例
const user = {
  userName: 'sullay',
  password: '123456',
  id: 100
}

router.get('/test', (ctx) => {
  ctx.body = 'test'
})

router.post('/login', (ctx) => {
  if (ctx.request.body.userName !== user.userName || ctx.request.body.password !== user.password) {
    ctx.body = {
      code: 400,
      msg: '用户名密码不匹配'
    }
    return
  }
  ctx.body = {
    code: 200,
    msg: '登陆成功',
    token: `Bearer ${jsonwebtoken.sign(
      { name: user.userName, id: user.id },
      SECRET,
      { expiresIn: '1h' }
    )}`
  }
})
router.get('/userInfo', (ctx) => {
  ctx.body = {
    code: '200',
    data: jsonwebtoken.decode(ctx.request.headers.authorization.replace(/^Bearer /, ''))
  }
})
module.exports = router

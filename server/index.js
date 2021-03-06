const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const koaBody = require('koa-body')
const koajwt = require('koa-jwt')
const router = require('../middleware/router/index')
const config = require('../nuxt.config.js')
const SECRET = require('../config/index').SECRET
const websocketServer = require('./websockt')
const app = new Koa()

// Import and Set Nuxt.js options
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
    sPort = process.env.sPort || 30001
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development

  // 错误处理
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      console.error(err)
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          code: 401,
          msg: '用户未登录'
        }
      }
    }
  })
  app.use(koaBody())
  // jwt 中间件
  app.use(koajwt({ secret: SECRET }).unless({
    // 登录接口不需要验证
    path: [/^(?!\/api)/, /^\/api\/login/]
  }))
  // 路由中间件
  app.use(router.routes(), router.allowedMethods())
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  // websockt服务启动
  websocketServer.listen(sPort)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()

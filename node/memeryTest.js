const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.data = new Array(10000).fill(10000).map(x => 10)
  await next()
})

app.use(ctx => {
  ctx.body = 'hello, world'
})

app.listen(8080, () => console.log('Port: 8080'))

const koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa-cors')
const convert = require('koa-convert')
const app = new koa()

// app.use(function *(){
//   this.body = "Hello World !!!";
// });

const whiteList = ['http://localhost:3001']

function checkOrigin(ctx) {
  const requestOrigin = ctx.accept.headers.origin

  return requestOrigin
}

app.use(convert(cors({ origin: checkOrigin })))

const pruebaRoutes = require('./router/prueba')

app.use(koaBody())
app.use(pruebaRoutes.routes())


app.use(async (ctx, next) => {
  try {
    console.log("autorizacion", ctx.request.headers.authorization)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = err.status || 400;
    ctx.body = err.message;
  }
})

app.use(async (ctx) => {
  ctx.body = 'index prueba'
})


app.listen(1234)
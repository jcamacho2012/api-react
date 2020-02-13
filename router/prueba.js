const Router = require('koa-router')


const router = new Router({
    prefix: '/prueba'
})

router.get('/', async (ctx) => {
    console.log("endppoint",ctx.request)
    ctx.status = 200
    ctx.body = { user: { nombre: "Jose", token: "12345" } }
    return
    // ctx.throw(new Error("error de prueba"),400)
})

module.exports = router
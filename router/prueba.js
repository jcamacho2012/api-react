const Router = require('koa-router')
const config = require('../config/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const router = new Router({
    prefix: '/prueba'
})

router.get('/', async (ctx) => {
    console.log("endppoint", ctx.request.header.authorization)
    ctx.status = 200
    ctx.body = { user: { nombre: "Jose", token: "12345" } }
    return
    // ctx.throw(new Error("error de prueba"),400)
})


router.post('/registrar', async (ctx) => {
    let request = ctx.request.body

    return bcrypt.hash(request.password, 10).then(response => {
        ctx.status = 200
        ctx.body = { password: response }
    })

})

router.post('/login', async (ctx) => {
    let request = ctx.request.body

    return bcrypt.compare(request.password, "$2b$10$2fCW69MrREG5z1RI9HkXE..UmKMywbxJRoYMnfq05xRbmS1kTzNT.").then(response => {
        if (!response) {
            ctx.status = 400
            ctx.body = { message: "no coincide password" }
            return
        }
        let user = userTokenizer({ nombre: request.nombre, apellido: request.apellido })
        user.compare = response
        ctx.status = 200
        ctx.body = { user }
    })

})

function userTokenizer(user) {
    let userTemp = {
        nombre: user.nombre,
        apellido: user.apellido,
        // exp: Math.floor(Date.now() / 1000) + (60 * 60 * 4)
    };

    var token = jwt.sign(JSON.stringify(userTemp), config.secret);
    userTemp.token = token;
    userTemp.exp = undefined;
    return userTemp;
}

module.exports = router
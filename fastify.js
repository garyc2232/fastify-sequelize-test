const fastify = require('fastify')({
    logger: true
})
require("./database/db");
const {
    createRelateion
} = require("./models/index")
const User = require('./handler/userHandler')
const Tweet = require('./handler/tweetHandler')

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
})

fastify.get('/user', async (request, reply) => {
    reply.send(await User.getAll())
})
fastify.get('/user/:id', async (request, reply) => {
    reply.send(await User.getByID(request.params.id))
})
fastify.post('/user', async (request, reply) => {
    reply.send(await User.create(request.body))
})
fastify.get('/tweet/:id', async (request, reply) => {
    reply.send(await Tweet.getByID(request.params.id))
})
fastify.post('/tweet', async (request, reply) => {
    reply.send(await Tweet.create(request.body))
})
fastify.get('/ping', (request, reply) => {
    reply.send({
        data: 'pong'
    })
})
fastify.post('/getToken', (request, reply) => {
    const token = fastify.jwt.sign({
        id: 1
    })
    reply.send({
        token
    })
})

const authedPath = (fastify, opts, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
    fastify.get('/ping', async (request, reply) => {
        const jwt = await request.jwtVerify()
        reply.send({
            data: 'pong from v1' + jwt.id
        })
    })
    fastify.get('/', (request, reply) => {
        reply.send({
            data: 'Hello'
        })
    })
    done()
}
fastify.register(authedPath, {
    prefix: '/auth'
})

// Run the server!
createRelateion().then(() => {
    fastify.listen(3000, (err, address) => {
        if (err) throw err
        fastify.log.info(`server listening on ${address}`)
    })
})
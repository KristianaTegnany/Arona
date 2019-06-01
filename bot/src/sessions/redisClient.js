import redis from 'redis'


export default redis.createClient({
    "port": process.env.REDIS_PORT,

    // "password":  process.env.redisPassword,

    "host": process.env.REDIS_HOST
})

import redis from 'redis'


export default redis.createClient({
    "port": process.env.REDIS_PORT,

    "password":  process.env.REDIS_PASSWORD || "",

    "host": process.env.REDIS_HOST
})

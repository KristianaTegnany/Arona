import redis from 'redis'


export default redis.createClient({
    "port": process.env.redisPort,

    "password":  process.env.redisPassword,

    "host": process.env.redisHost
})

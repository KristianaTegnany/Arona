import client from './redisClient'
export default function (senderId, cb) {
    client.get(senderId, function (err, reply) {
        cb(JSON.parse(reply))
    })
}
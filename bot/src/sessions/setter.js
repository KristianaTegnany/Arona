import client from './redisClient'
export default function (senderID, obj,callback) {
    client.set(senderID, JSON.stringify(obj),'EX', 60 * 60 * 24,callback)
}

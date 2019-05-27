import client from './redisClient'
import app from '../app.js'
export default function (senderId, field) {
    let obj = app.get('sessions')
    if (obj) {
        if (!obj.hasOwnProperty(senderId)) {
            obj[senderId] = {}
        }
    } else {
        obj = {}
        obj[senderId] = {}
    }

    delete obj[senderId][field]
    app.set('sessions', obj)
}
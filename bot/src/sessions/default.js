import app from '../app.js'
import client from './redisClient'
export default function (senderId) {
    let obj = app.get('lang')
    if (obj) {
        if (!obj.hasOwnProperty(senderId)) {
            setdefault(obj,senderId)
        }
    } else {
        obj = {}
        setdefault(obj,senderId)
    }
}

function setdefault(obj,senderId) {
    obj[senderId] = {
        lang: 'fr'
    }
    client.set("sessions",obj)
}
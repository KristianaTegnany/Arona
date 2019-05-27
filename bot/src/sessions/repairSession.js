import {
    getter,
    setter,
    eraser
} from '../sessions'
import redisClient from '../sessions/redisClient'

export default function (event, object) {
    let senderID = event.sender.id
    // if (object.lyric_title && !event.message && !event.postback) {
    //     console.log("deleted")
    //     delete object.lyric_title
    // }
    // redisClient.set(senderID, JSON.stringify(object))
}


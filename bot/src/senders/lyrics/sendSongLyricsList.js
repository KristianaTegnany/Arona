import callSendAPI from '../callSendAPI'
import locales from '../../../locales/data'
import {
    getter,
    setter,
    eraser
} from '../../sessions'
import {
    sendTextMessage,
    sendDivertissementMenuQuickReply
} from '../index';

export default function (recipientId, userSession, hits) {
    let lang = userSession.lang
    let elements = []
    
    for (let i = 0; i < hits.length; i++) {
        const e = hits[i];
        let temp = {}
        temp['title'] = e.result.full_title
        temp['image_url'] = e.result.header_image_url
        temp['buttons'] = [{
            "type": "postback",
            "title": locales.choose[lang],
            "payload": JSON.stringify({
                url: e.result.url,
                type: 'lyric',
                title : e.result.full_title
            }),
        }]
        elements.push(temp)
    }

    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                elements
            }
        }
    }
    if (elements.length == 0) {
        sendDivertissementMenuQuickReply(recipientId, locales.no_song_results[lang])
    } else {
        callSendAPI(recipientId, messageData);
        // sendTextMessage(recipientId, locales.no_song_results[lang])
    }
}
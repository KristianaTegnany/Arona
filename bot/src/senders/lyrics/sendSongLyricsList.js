import callSendAPI from '../callSendAPI'
import locales from '../../../locales/data'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'

import {
    getter,
    setter,
    eraser
} from '../../sessions'
import {
    sendTextMessage,
    sendDivertissementMenuQuickReply,
    sendAronaPlusQuickReply
} from '../index';

export default function (recipientId, userSession, hits) {
    let lang = userSession.lang
    let elements = []
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.akinator[userSession.lang], "akinator")
    qr.add_text_without_image(locales.video_musique[userSession.lang], "youtube")
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
    
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
        },
        "quick_replies": create_quick_replies(qr)
    }
    if (elements.length == 0) {
        sendAronaPlusQuickReply(recipientId, userSession,locales.no_song_results[lang],"lyrics")
    } else {
        callSendAPI(recipientId, messageData);
        // sendTextMessage(recipientId, locales.no_song_results[lang])
    }
}
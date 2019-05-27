import locales from '../../../locales/data'
import callSendAPI from '../callSendAPI';
import sendDivertissementMenuQuickReply from '../sendDivertissementMenuQuickReply';
import sendMainMenuQuickReply from '../sendMainMenuQuickReply';

export default function (senderID, userSession, results, cb) {
    let lang = userSession.lang
    let elements = []
    if (results.length == 0) {
        console.log(results)
        sendMainMenuQuickReply(senderID, userSession, locales.no_images_results[lang])
    } else {
        for (let i = 0; i < results.length; i++) {
            const a = results[i];
            if (i != 0 && i % 10 == 0) {
                send(elements, senderID)
                elements = []
            } else {
                if (i == results.length - 1) {
                    const e = results[i];
                    elements.push(createTemp(e, lang))
                    send(elements, senderID)
                }
            }
            const e = results[i];
            elements.push(createTemp(e, lang))
        }
    }
}

function send(elements, senderID) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                elements
            }
        }
    }
    callSendAPI(senderID, messageData);
}

function createTemp(e, lang) {
    let temp = {}
    temp['title'] = e.title
    temp['image_url'] = e.mediaurl
    temp['buttons'] = [{
        "type": "postback",
        "title": locales.choose[lang],
        "payload": JSON.stringify({
            type: "download_image",
            url: e.mediaurl
        }),
    }]
    return temp
}
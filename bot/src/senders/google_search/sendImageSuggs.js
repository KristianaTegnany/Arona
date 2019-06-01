import locales from '../../../locales/data'
import callSendAPI from '../callSendAPI';
import sendDivertissementMenuQuickReply from '../sendDivertissementMenuQuickReply';
import sendGoogleQuickReply from '../sendGoogleQuickReply';
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'

export default function (senderID, userSession, results, cb) {
    let lang = userSession.lang
    let elements = []
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.translate[userSession.lang], "translate")
    qr.add_text_without_image(locales.download_apk[userSession.lang], "download_apk")
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
    if (results.length == 0) {
        console.log(results)
        sendGoogleQuickReply(senderID, userSession, locales.no_images_results[lang],"google_search")
    } else {
        for (let i = 0; i < results.length; i++) {
            const a = results[i];
            if (i != 0 && i % 10 == 0) {
                send(elements, senderID,qr)
                elements = []
            } else {
                if (i == results.length - 1) {
                    const e = results[i];
                    elements.push(createTemp(e, lang))
                    send(elements, senderID,qr)
                }
            }
            const e = results[i];
            elements.push(createTemp(e, lang))
        }
    }
}

function send(elements, senderID,qr) {
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
import callSendAPI from '../callSendAPI'
import sendGoogleQuickReply from '../sendGoogleQuickReply';
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import locales from '../../../locales/data'

export default function (senderID, userSession, results, cb) {
    let elements = []
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.translate[userSession.lang], "translate")
    qr.add_text_without_image(locales.download_apk[userSession.lang], "download_apk")
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")

    for (let i = 0; i < results.length; i++) {
        const e = results[i];
        let temp = {}
        temp['title'] = e.title
        temp['subtitle'] = e.description
        temp['image_url'] = e.link
        temp['buttons'] = [{
            "type": "postback",
            "title": 'Capturer',
            "payload": JSON.stringify({
                url: e.link,
                type: 'web.screenshoot',
                title: e.title
            }),
        }, {
            "type": "postback",
            "title": 'Télécharger',
            "payload": JSON.stringify({
                url: e.link,
                type: 'web.download',
                title: e.title
            }),
        }]
        elements.push(temp)
    }
    send(senderID,userSession,elements,qr,cb)
}

function send(senderID,userSession,elements,qr,cb) {
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
        sendGoogleQuickReply(senderID, userSession,locales.no_images_results[lang],"google_search")
    } else {
        callSendAPI(senderID, messageData,cb);
        // sendTextMessage(senderID, locales.no_song_results[lang])
    }
}
import callSendAPI from '../callSendAPI'
export default function (senderID, userSession, results, cb) {
    let elements = []
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
    send(elements, senderID,cb)
}

function send(elements, senderID,cb) {
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
        sendDivertissementMenuQuickReply(senderID, locales.no_images_results[lang])
    } else {
        callSendAPI(senderID, messageData,cb);
        // sendTextMessage(senderID, locales.no_song_results[lang])
    }
}
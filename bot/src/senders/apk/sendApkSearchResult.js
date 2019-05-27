import callSendAPI from '../callSendAPI'
import locales from '../../../locales/data'
import sendDivertissementMenuQuickReply from '../sendDivertissementMenuQuickReply';
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'


export default function (recipientId, userSession, appSearchList, cb) {
    let elements = []
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
    for (let i = 0; i < appSearchList.length; i++) {
        const element = appSearchList[i];

        let temp = {}
        temp['title'] = element.title
        temp['subtitle'] = element.description
        temp['image_url'] = element.image
        temp['buttons'] = [{
            "type": "postback",
            "title": locales.apk_infos[userSession.lang],
            "payload": JSON.stringify({
                appId : element.id,
                type: 'apk.informations'
            }),
        }, {
            "type": "postback",
            "title": locales.apk_screenshots[userSession.lang],
            "payload": JSON.stringify({
                type: 'apk.screenshots',
                appId: element.id
            }),
        }, {
            "type": "postback",
            "title": locales.download[userSession.lang],
            "payload": JSON.stringify({
                type: 'apk.download',
                appId: element.id
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
    callSendAPI(recipientId, messageData, function () {
        // sendDivertissementMenuQuickReply(recipientId,userSession, locales.back_to_main_menu_after_youtube[userSession.lang], function () {})
    });
}
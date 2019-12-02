import gplay from 'google-play-scraper'
import locales from '../../../locales/data'
import translate from 'node-google-translate-skidz'
import Quick_replies_class from '../../senders/quick_replies/Quick_replies_class'
import {
    sendTextMessage,
    sendImageFile
} from '../../senders';
export default function (senderID, userSession, appId, cb) {
    gplay.app({
            appId
        })
        .then((data) => {
            translate({
                text: data.description,
                target: userSession.lang
            }).then((translatedDescription) => {
                let output = `${locales.title[userSession.lang]} : ${data.title}\n\n${locales.size[userSession.lang]} : ${data.size}\n\n${locales.genre[userSession.lang]} : ${data.genre}\n\n${locales.score[userSession.lang]} : ${data.score}\n\n${locales.version[userSession.lang]} : ${data.version}\n\nappId : ${data.appId}\n\n${locales.description[userSession.lang]} : ${translatedDescription}`
                recursiveSendTextMessage(senderID, userSession, convertStringToArray(output), 0, data.icon)
            })
        })
}

function recursiveSendTextMessage(senderID, userSession, parts, i, icon) {
    sendTextMessage(senderID, parts[i], function () {
        if (i + 1 < parts.length) {
            recursiveSendTextMessage(senderID, userSession, parts, i + 1, icon)
        } else {
            var qr = new Quick_replies_class()
            qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
            sendImageFile(senderID, icon, function () {
                
            }, qr)
        }
    })
}

function convertStringToArray(response) {
    // console.log(response)
    let parts = response.split('\n') || []
    let string = ""
    let output = []
    for (let i = 0; i < parts.length; i++) {
        const e = parts[i];
        if ((`${string}\n${e}`).length < 2000) {
            string = `${string}\n${e}`
        } else {
            output.push(string)
            string = e
        }
    }
    output.push(string)
    return output
}
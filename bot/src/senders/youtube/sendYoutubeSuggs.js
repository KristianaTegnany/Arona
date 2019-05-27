import callSendAPI from '../callSendAPI'
import ms from 'parse-ms'
import locales from '../../../locales/data'
import sendDivertissementMenuQuickReply from '../sendDivertissementMenuQuickReply';

import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'

export default function (recipientId, userSession, videos, infos, page) {

    let TITLE_LIMIT = 65
    let elements = []
    for (let i = 0; i < infos.length; i++) {
        const e = infos[i];
        let parts = infos[i].thumbnail_url.split('/')
        let last = `hq${parts[parts.length-1]}`
        parts[parts.length - 1] = last
        let thumbnail_url = parts.join('/')
        let title = e.title.substring(0, TITLE_LIMIT)
        // console.log(parseSec(infos[i].length_seconds))
        // console.log(results[i])
        let temp = {}
        temp['title'] = `${title}\n[${parseSec(infos[i].length_seconds)}]`
        temp['subtitle'] = infos[i].description
        temp['image_url'] = thumbnail_url
        temp['buttons'] = [{
            "type": "postback",
            "title": 'Video',
            "payload": JSON.stringify({
                url: `https://youtube.com${videos[i].url}`,
                type: 'video',
                title: title
            }),
        }, {
            "type": "postback",
            "title": 'Audio',
            "payload": JSON.stringify({
                url: `https://youtube.com${videos[i].url}`,
                type: 'audio',
                title: title
            }),
        }]
        elements.push(temp)
    }
    let qr = new Quick_replies_class()
    // qr.add_text_without_image(locales.download[userSession.lang], packageSuggs)
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
    qr.add_text_without_image(locales.next[userSession.lang], JSON.stringify({
        type : 'next',
        page : page+1
    }))
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
    // console.log(elements);
    if (elements.length == 0) {
        sendDivertissementMenuQuickReply(recipientId,userSession, locales.no_song_results[lang])
    } else {
        callSendAPI(recipientId, messageData, function () {
            // sendDivertissementMenuQuickReply(recipientId,userSession, locales.back_to_main_menu_after_youtube[userSession.lang], function () {})
        });
        // sendTextMessage(recipientId, locales.no_song_results[lang])
    }
}

function parseSec(sec) {
    var duration = ms(sec * 1000)
    var durationString = ''
    if (sec >= 3600) {
        return parseNumber(duration.hours) + ':' + parseNumber(duration.minutes) + ':' + parseNumber(duration.seconds)
    }
    return parseNumber(duration.minutes) + ':' + parseNumber(duration.seconds)
}

function parseNumber(number) {
    number = number.toString()
    if (number.length == 1) {
        number = '0' + number
    }
    return number
}
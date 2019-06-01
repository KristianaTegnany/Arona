import {
    genius
} from './api'

import {
    sendTextMessage,
    sendDivertissementMenu,
    sendServicesMenu,
    sendMainMenu,
    sendDivertissementMenuQuickReply,
    sendAronaPlusQuickReply
} from '../../senders'
import {
    getter
} from '../../sessions'
import locales from '../../../locales/data'
export default function (senderID,userSession, payload) {
    genius.getSongLyrics(payload.url).then(function (res) {

        let response = `${payload.title}\n\n${res.lyrics}`

        let parts = convertStringToArray(response)
        recursiveSendTextMessage(senderID,userSession, parts, 0)
    })
}

function recursiveSendTextMessage(senderID,userSession, parts, i) {
    sendTextMessage(senderID, `${parts[i]}\n\n(Part${i+1}/${parts.length})`, function () {
        if (i+1 < parts.length) {
            recursiveSendTextMessage(senderID,userSession, parts, i + 1)
        } else {
            sendAronaPlusQuickReply(senderID,userSession, locales.choose_divertissement_menu_or_search_another[userSession.lang],"lyrics")
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
        if ((`${string}\n${e}`).length < 1900) {
            string = `${string}\n${e}`
        } else {
            output.push(string)
            string = e
        }
    }
    output.push(string)
    return output
}
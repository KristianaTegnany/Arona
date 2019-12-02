import image_moderation from 'image-moderation'
import urlToImage from 'url-to-image'
import bing from 'nodejs-bing'
import {
    setter
} from '../../sessions';
import {
    sendWebSuggs,
    sendMainMenuQuickReply
} from '../../senders';
import locales from '../../../locales/data'
const SAFE = 90.0

export default function (senderID, userSession, userInput, cb) {
    try {
        bing.web(userInput).then(function (results) {
            sendWebSuggs(senderID, userSession, results, cb)
            // sendImageSuggs(senderID, userSession, results, cb)

        })
    } catch (error) {
        sendMainMenuQuickReply(senderID,userSession, locales.retry[userSession.lang])
    }
    console.log(userInput)
}
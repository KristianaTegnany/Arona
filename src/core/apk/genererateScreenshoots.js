import gplay from 'google-play-scraper'
import locales from '../../../locales/data'
import translate from 'node-google-translate-skidz'
import {
    sendTextMessage,
    sendImageFile
} from '../../senders';
export default function (senderID, userSession, appId, cb) {
    gplay.app({
            appId
        })
        .then((data) => {
            for (let i = 0; i < data.screenshots.length; i++) {
                const e = data.screenshots[i];
                sendImageFile(senderID, e)
            }
        })
}

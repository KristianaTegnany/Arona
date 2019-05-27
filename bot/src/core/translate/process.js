import translate from 'node-google-translate-skidz'
import {
    sendTextMessage, sendMainMenuQuickReply,sendGoogleQuickReply
} from '../../senders';
import locales from '../../../locales/data'
export default function (senderID, userSession,lang) {

    translate({
        text: userSession.translate,
        target : lang
    }, function (result) {
        if(result)
        sendGoogleQuickReply(senderID,userSession, result.translation,"translate")
    });
}
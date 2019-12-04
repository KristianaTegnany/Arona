import callSendAPI from './callSendAPI'
import Quick_replies_class from './quick_replies/Quick_replies_class'
import create_quick_replies from './quick_replies/create_quick_replies'
import locales from '../../locales/data'
import {
  getter
} from '../sessions'
export default function (recipientId,userSession, messageText, cb) {
    
    var qr = new Quick_replies_class()
    qr.add_text_without_image("Malagasy", "translate.mg")
    qr.add_text_without_image("Français", "translate.fr")
    qr.add_text_without_image("English", "translate.en")


    callSendAPI(recipientId, {
        text : messageText,
        quick_replies: create_quick_replies(qr)
    }, cb);
}
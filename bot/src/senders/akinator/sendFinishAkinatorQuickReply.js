import locales from '../../../locales/data'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import callSendAPI from '../callSendAPI';

export default function (senderID, userSession, messageQuestion, cb) {
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.restart[userSession.lang], 'restart')
    qr.add_text_without_image(locales.back[userSession.lang], 'divertissement_menu')
    qr.add_text_without_image(locales.main_menu[userSession.lang], 'main_menu')
    console.log(messageQuestion)
    callSendAPI(senderID, {
      text : messageQuestion,
      quick_replies: create_quick_replies(qr)
    }, cb);
}
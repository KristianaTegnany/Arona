import locales from '../../../locales/data'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import callSendAPI from '../callSendAPI';

export default function (senderID, userSession, messageQuestion, cb) {
    var qr = new Quick_replies_class()
    qr.add_text_without_image(locales.yes[userSession.lang], 0)
    qr.add_text_without_image(locales.no[userSession.lang], 1)
    qr.add_text_without_image(locales.idk[userSession.lang], 2)
    qr.add_text_without_image(locales.probably[userSession.lang], 3)
    qr.add_text_without_image(locales.probably_not[userSession.lang], 4)
    qr.add_text_without_image(locales.back[userSession.lang], 5)
    qr.add_text_without_image(locales.exit[userSession.lang], "divertissement_menu")
    console.log(messageQuestion)
    callSendAPI(senderID, {
      text : messageQuestion,
      quick_replies: create_quick_replies(qr)
    }, cb);
}
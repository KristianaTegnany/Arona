import callSendAPI from '../callSendAPI'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import locales from '../../../locales/data'
export default function (recipientId, userSession, messageText, packageSuggs, cb) {
  var qr = new Quick_replies_class()
  qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
  // qr.add_text_without_image(locales.download[userSession.lang], packageSuggs)

  callSendAPI(recipientId, {
    text: messageText,
    quick_replies: create_quick_replies(qr)
  }, cb);
}


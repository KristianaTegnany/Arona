import callSendAPI from '../callSendAPI'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import {
  getter
} from '../../sessions'
import locales from '../../../locales/data'
export default function (recipientId, userSession,messageText, cb) {
  getter(recipientId, function (obj) {
    var qr = new Quick_replies_class()
    qr.add_text_without_image("WEB", "google_search.web")
    qr.add_text_without_image("IMAGE", "google_search.image")
    qr.add_text_without_image(locales.translate[userSession.lang], "translate")
    qr.add_text_without_image(locales.download_apk[userSession.lang], "download_apk")
    qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
    callSendAPI(recipientId, {
      text : messageText,
      quick_replies: create_quick_replies(qr)
    }, cb);
  })
}
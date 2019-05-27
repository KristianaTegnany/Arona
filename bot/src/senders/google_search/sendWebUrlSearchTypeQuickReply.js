import callSendAPI from '../callSendAPI'
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import locales from '../../../locales/data'
export default function (recipientId, userSession, messageText, cb) {
  var qr = new Quick_replies_class()
  qr.add_text_without_image(locales.page_download[userSession.lang], "url_page_download")
  qr.add_text_without_image(locales.page_screenshoot[userSession.lang], "url_page_screenshoot")

  callSendAPI(recipientId, {
    text: messageText,
    quick_replies: create_quick_replies(qr)
  }, cb);
}
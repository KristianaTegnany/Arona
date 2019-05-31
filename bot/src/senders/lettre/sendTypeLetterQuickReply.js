import callSendAPI from './../callSendAPI'
import Quick_replies_class from './../quick_replies/Quick_replies_class'
import create_quick_replies from './../quick_replies/create_quick_replies'
import locales from '../../../locales/data'
import {
  getter
} from '../../sessions'
export default function (recipientId,userSession, messageText, cb) {
    
  var qr = new Quick_replies_class()

  qr.add_text_without_image(locales.letter_cv[userSession.lang], "cv")
  qr.add_text_without_image(locales.letter_lm[userSession.lang], "lm")
  qr.add_text_without_image(locales.bus[userSession.lang], "bus")
  qr.add_text_without_image(locales.send_sms[userSession.lang], "sms")
  qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")

  callSendAPI(recipientId, {
    text : messageText,
    quick_replies: create_quick_replies(qr)
  }, cb);
}
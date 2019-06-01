import callSendAPI from './callSendAPI'
import Quick_replies_class from './quick_replies/Quick_replies_class'
import create_quick_replies from './quick_replies/create_quick_replies'
import locales from '../../locales/data'
import {
  getter
} from '../sessions'
export default function (recipientId,userSession, messageText, toDisable, cb) {
    
  var qr = new Quick_replies_class()

  if(toDisable == "translate"){
    qr.add_text_without_image(locales.google_search[userSession.lang], "google_search")
    qr.add_text_without_image(locales.download_apk[userSession.lang], "download_apk")
  }
  else if(toDisable == "google_search"){
    qr.add_text_without_image(locales.translate[userSession.lang], "translate")
    qr.add_text_without_image(locales.download_apk[userSession.lang], "download_apk")
  }
  else{
    qr.add_text_without_image(locales.translate[userSession.lang], "translate")
    qr.add_text_without_image(locales.google_search[userSession.lang], "google_search")
  }
  qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
  
  callSendAPI(recipientId, {
    text : messageText,
    quick_replies: create_quick_replies(qr)
  }, cb);
}
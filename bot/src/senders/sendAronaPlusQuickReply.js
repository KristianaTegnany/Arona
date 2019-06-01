import callSendAPI from './callSendAPI'
import Quick_replies_class from './quick_replies/Quick_replies_class'
import create_quick_replies from './quick_replies/create_quick_replies'
import locales from '../../locales/data'
import {
  getter
} from '../sessions'
export default function (recipientId,userSession, messageText, toDisable, cb) {
    
  var qr = new Quick_replies_class()

  if(toDisable == "lyrics"){
    qr.add_text_without_image(locales.akinator[userSession.lang], "akinator")
    qr.add_text_without_image(locales.video_musique[userSession.lang], "youtube")
  }
  else if(toDisable == "akinator"){
    qr.add_text_without_image(locales.lyrics[userSession.lang], "lyrics")
    qr.add_text_without_image(locales.video_musique[userSession.lang], "youtube")
  }
  else{
    qr.add_text_without_image(locales.lyrics[userSession.lang], "lyrics")
    qr.add_text_without_image(locales.akinator[userSession.lang], "akinator")
  }
  qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
  
  callSendAPI(recipientId, {
    text : messageText,
    quick_replies: create_quick_replies(qr)
  }, cb);
}
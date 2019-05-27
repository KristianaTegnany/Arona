import locales from "../../../locales/data";
import Quick_replies_class from "../quick_replies/Quick_replies_class";
import create_quick_replies from "../quick_replies/create_quick_replies";
import callSendAPI from "../callSendAPI";

export default function(senderID, userSession, cb) {
  var qr = new Quick_replies_class();
  qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu");
  callSendAPI(
    senderID,
    {
      text: locales.sms_text_error[userSession.lang],
      quick_replies: create_quick_replies(qr)
    },
    cb
  );
}

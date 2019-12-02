import callSendAPI from "./callSendAPI";
import locales from "../../locales/data";
import { getter, setter, eraser } from "../sessions";
import app from "../app.js";
import Quick_replies_class from "./quick_replies/Quick_replies_class";
import create_quick_replies from "./quick_replies/create_quick_replies";
export default function(recipientId, userSession) {
  var qr = new Quick_replies_class();
  qr.add_text_without_image(
    locales.envoyer_un_sms[userSession.lang],
    "fast_food"
  );
  qr.add_text_without_image(
    locales.chercher_sur_google[userSession.lang],
    "bar"
  );
  qr.add_text_without_image(locales.download_apk[userSession.lang], "bar");
  let lang = userSession.lang;
  //   let messageData = {
  //     attachment: {
  //       type: "template",
  //       payload: {
  //         template_type: "generic",
  //         elements: [
  //           {
  //             title: locales.arona_services[lang],
  //             image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
  //             buttons: [
  //               {
  //                 type: "postback",
  //                 title: locales.envoyer_un_sms[lang],
  //                 payload: "fast_food"
  //               },
  //               {
  //                 type: "postback",
  //                 title: locales.chercher_sur_google[lang],
  //                 payload: "bar"
  //               },
  //               {
  //                 type: "postback",
  //                 title: locales.download_apk[lang],
  //                 payload: "bar"
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     }
  //   };
  callSendAPI(recipientId, {
    text: "Services",
    quick_replies: create_quick_replies(qr)
  });
}

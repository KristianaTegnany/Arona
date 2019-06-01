import callSendAPI from "./callSendAPI";
import app from "../app.js";
import locales from "../../locales/data";
import { getter, setter, eraser } from "../sessions";
import Quick_replies_class from "./quick_replies/Quick_replies_class";
import create_quick_replies from "./quick_replies/create_quick_replies";
export default function(recipientId, userSession) {
  var qr = new Quick_replies_class();
  qr.add_text_without_image(locales.video_musique[userSession.lang], "youtube");
  qr.add_text_without_image(locales.lyrics[userSession.lang], "lyrics");
  qr.add_text_without_image(locales.akinator[userSession.lang], "akinator");
  //   let lang = userSession.lang;
  //   let messageData = {
  //     attachment: {
  //       type: "template",
  //       payload: {
  //         template_type: "generic",
  //         elements: [
  //           {
  //             title: locales.arona_divertissement[lang],
  //             image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
  //             buttons: [
  //               {
  //                 type: "postback",
  //                 title: locales.video_musique[lang],
  //                 payload: "youtube"
  //               },
  //               {
  //                 type: "postback",
  //                 title: locales.lyrics[lang],
  //                 payload: "lyrics"
  //               },
  //               {
  //                 type: "postback",
  //                 title: locales.akinator[lang],
  //                 payload: "akinator"
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     }
  //   };

  callSendAPI(recipientId, {
    text: "Divertissement",
    quick_replies: create_quick_replies(qr)
  });
}

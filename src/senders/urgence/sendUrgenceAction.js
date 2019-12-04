require('dotenv').load();
import callSendAPI from "../callSendAPI";
import locales from "../../../locales/data";
import { setter } from "../../sessions";

export default function(recipientId, userSession, pharmacie) {
  let lang = userSession.lang;
  let new_obj = {};
  new_obj.lang = lang;
  setter(recipientId, new_obj);
  
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: pharmacie,
            image_url: `${process.env.currentUrl}/main_menu/arona_plus.png`,
            buttons: [
              {
                type: "phone_number",
                title: "Antsoina",
                payload: "0344813906"
              },
              {
                type: "postback",
                title: "Menu principale",
                payload: "main_menu"
              }
            ]
          }
        ]
      }
    }
  };

  callSendAPI(recipientId, messageData);
}

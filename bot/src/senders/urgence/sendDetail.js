require('dotenv').load();
import callSendAPI from ".../callSendAPI";
import locales from "../../../locales/data";
export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: locales.urgence[lang],
            image_url: `${process.env.currentUrl}/main_menu/arona_plus.png`,
            buttons: [
              {
                type: "postback",
                title: "Pharmacie Tsara",
                payload: "urgence.pharm_tsara"
              },
              {
                type: "postback",
                title: "Pharmacie Henintsoa",
                payload: "urgence.pharm_henintsoa"
              },
              {
                type: "postback",
                title: "Pharmacie Du Sud",
                payload: "urgence.pharm_du_sud"
              }
            ]
          }
        ]
      }
    }
  };

  callSendAPI(recipientId, messageData);
}

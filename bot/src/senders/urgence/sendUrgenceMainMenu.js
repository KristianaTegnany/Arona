require('dotenv').load();
import callSendAPI from "../callSendAPI";
import locales from "../../../locales/data";
import sendServicesQuickReply from "../sendServicesQuickReply";

export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        image_aspect_ratio: "square",
        elements: [
          {
            title: locales.urgence[lang],
            image_url: 'https://images-na.ssl-images-amazon.com/images/I/61r3at5gCoL._SX425_.jpg',
            buttons: [
              {
                type: "postback",
                title: "Ambulance",
                payload: "ambulance"
              },
              {
                type: "postback",
                title: "Pharmacie",
                payload: "pharmacie"
              }
            ]
          },
          {
            title: locales.urgence[lang],
            image_url: 'http://freeflowingenergy.com/wp-content/uploads/2010/06/pushing-button.jpg?w=300',
            buttons: [
              {
                type: "postback",
                title: "Police",
                payload: "police"
              },
              {
                type: "postback",
                title: "Pompier",
                payload: "pompier"
              }
            ]
          }
        ]
      }
    }
  };
  callSendAPI(recipientId, messageData);
}

require('dotenv').load();
import callSendAPI from "../callSendAPI";
import locales from "../../../locales/data";
import ambulanceListe from "./ambulanceListe";

export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: ambulanceListe()
      }
    }
  };
  callSendAPI(recipientId, messageData);
}

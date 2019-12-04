require('dotenv').load();
import callSendAPI from "../callSendAPI";
import locales from "../../../locales/data";
import policeListe from "./policeListe";

export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: policeListe()
      }
    }
  };
  callSendAPI(recipientId, messageData);
}

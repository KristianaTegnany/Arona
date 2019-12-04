require('dotenv').load();
import callSendAPI from "../callSendAPI";
import locales from "../../../locales/data";
import pharmacieListe from "./pharmacieListe";

export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: pharmacieListe()
      }
    }
  };
  callSendAPI(recipientId, messageData);
}

import {
  sendTextMessage,
  sendAskTextSMS,
  sendErrorNumber,
  sendSMSSuccess,
  sendSMSError,
  sendSMSTextError
} from "../../senders";
import { setter } from "../../sessions";
import submitTwilioSMS from "./submitTwilioSMS";
export default function(senderID, userSession, text) {
  if (text.length < 161) {
    // sendTextMessage(senderID, `${userSession.sms_number} : ${text}`);
    submitTwilioSMS(
      userSession.sms_number,
      text,
      function() {
        sendSMSSuccess(senderID, userSession);
      },
      function(error) {
        console.log(error);
        sendSMSError(senderID, userSession);
      }
    );
    userSession.sms = false;
    userSession.sms_number = undefined;
    setter(senderID, userSession);
  } else {
    sendSMSTextError(senderID, userSession);
  }
}

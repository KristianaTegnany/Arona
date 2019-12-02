import { setter } from "../../sessions";
import validatePhoneNumber from "validate-phone-number-node-js";
import {
  sendTextMessage,
  sendAskTextSMS,
  sendErrorNumber
} from "../../senders";

const PNF = require("google-libphonenumber").PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

export default function(senderID, userSession, numberInput) {
  const number = phoneUtil.parseAndKeepRawInput(numberInput, "MG");

  if (phoneUtil.isValidNumber(number)) {
    userSession.sms_number = phoneUtil.format(number, PNF.INTERNATIONAL);
    userSession.sms = false;
    setter(senderID, userSession);
    sendAskTextSMS(senderID, userSession);
  } else {
    sendErrorNumber(senderID, userSession);
  }
}

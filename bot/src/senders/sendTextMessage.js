import callSendAPI from './callSendAPI'
export default function (recipientId, messageText, cb) {
  let messageData = {
    text: messageText,
    metadata: "messageText"
  };

  callSendAPI(recipientId, messageData,cb);
}
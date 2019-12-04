import callSendAPI from './callSendAPI'
import create_quick_replies from './quick_replies/create_quick_replies'
export default function (recipientId, urlImage, cb, qr) {
  let messageData = {}
  if (qr) {
    
    messageData = {
      "attachment":{
          "type":"image", 
          "payload":{
            "is_reusable": true,
            "url":urlImage
          }
        },
        "quick_replies": create_quick_replies(qr)
    };
  }else{

    messageData = {
      "attachment":{
          "type":"image", 
          "payload":{
            "is_reusable": true,
            "url":urlImage
          }
        }
    };
  }

  callSendAPI(recipientId, messageData,cb);
}
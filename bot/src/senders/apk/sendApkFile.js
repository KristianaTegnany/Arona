import callSendAPIFile from '../callSendAPIFile'
import locales from './../../../locales/data' ;
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');

export default function (senderID, userSession,file_loc, cb, err_cb){
 var readStream = fs.createReadStream(file_loc);
 var messageData = new FormData();
 console.log(file_loc);
 var qr = new Quick_replies_class()
qr.add_text_without_image(locales.translate[userSession.lang], "translate")
qr.add_text_without_image(locales.google_search[userSession.lang], "google_search")
qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
 
 messageData.append('recipient', '{id:' +senderID+ '}');
 messageData.append('message', '{attachment :{type:"file", payload:{}}},"quick_replies": create_quick_replies(qr)');
 messageData.append('filedata', readStream);
//  console.log(messageData);
 callSendAPIFile(messageData, senderID,userSession, cb, file_loc, err_cb);
}
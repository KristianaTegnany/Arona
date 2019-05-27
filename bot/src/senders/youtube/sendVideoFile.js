
import callSendAPIFile from '../callSendAPIFile'
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');

export default function (senderID, userSession,file_loc, cb, err_cb){
 var readStream = fs.createReadStream(file_loc);
 var messageData = new FormData();
 console.log(file_loc);
 
 messageData.append('recipient', '{id:' +senderID+ '}');
 messageData.append('message', '{attachment :{type:"video", payload:{}}}');
 messageData.append('filedata', readStream);
//  console.log(messageData);
 callSendAPIFile(messageData, senderID,userSession, cb, file_loc, err_cb);
}
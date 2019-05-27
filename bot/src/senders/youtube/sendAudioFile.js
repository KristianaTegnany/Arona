// import callSendAPI from '../callSendAPI'
// export default function (senderID, userSession, audio_filename, cb) {
//     // console.log(`${process.env.currentUrl}/youtube/audio/${audio_filename}`);
//     console.log(`${process.env.currentUrl}/youtube/audio/RA FORCE - AMNAZY NY STIL (2019).mp3`);
    
//     let messageData = {
//         "attachment": {
//             "type": "audio",
//             "payload": {
//                 "url": `${process.env.currentUrl}/youtube/audio/RA FORCE - AMNAZY NY STIL (2019).mp3`,
//                 "is_reusable": true
//             }
//         }
//     }
//     callSendAPI(senderID, messageData,cb);
// }

import callSendAPIFile from '../callSendAPIFile'
var FormData = require('form-data');
var fs = require('fs');
var https = require('https');
import Quick_replies_class from '../quick_replies/Quick_replies_class'
import create_quick_replies from '../quick_replies/create_quick_replies'
import locales from './../../../locales/data'

export default function (senderID, userSession,file_loc, cb, audio_path){
 var readStream = fs.createReadStream(file_loc);
 var messageData = new FormData();
 console.log(file_loc);

 let qr = new Quick_replies_class()
 qr.add_text_without_image(locales.lyrics[userSession.lang], "lyrics")
 qr.add_text_without_image(locales.akinator[userSession.lang], "akinator")
 qr.add_text_without_image(locales.main_menu[userSession.lang], "main_menu")
 
 messageData.append('recipient', '{id:' +senderID+ '}');
 messageData.append('message', '{attachment :{type:"audio", payload:{}},"quick_replies": create_quick_replies(qr)}');
 messageData.append('filedata', readStream);
//  console.log(messageData);
 callSendAPIFile(messageData, senderID,userSession, cb, audio_path);
}
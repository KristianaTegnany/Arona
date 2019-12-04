require('dotenv').load();
import https from 'https'
import sendDivertissementMenuQuickReply from './sendDivertissementMenuQuickReply';
import locales from '../../locales/data'
import fs from 'fs'
const request = require('request')

export default function callSendAPI(messageData, recipientId, userSession, cb, file_path, err_cb) {
    var options = {
        method: 'post',
        host: 'graph.facebook.com',
        path: '/v2.6/me/messages?access_token=EAAil04WAIMMBAPpXLZCsHNIJknRClkmWypIZAwQqOPdhT83J1vABUblInC2bN2JFZBi9ZCNRWkjvTGIZB8CTwtfFzVKzGO0fZBNtZAHbfk5lz1m6hMnAH2IXSv0V8UHWqCnINa67dGQ9FuK1FvgzbprDxIZAtfEDTDOOXuGDAdYFnJIJWN27SdSG',
        headers: messageData.getHeaders()
    };
    var request = https.request(options);
    messageData.pipe(request);

    request.on('error', function (error) {
        console.log(error);
        handleError(recipientId, userSession, file_path, `${locales.file_send_error[userSession.lang]} : ${error}`, err_cb)
        return;
    });
    request.on('response', function (res) {
        if (res.statusMessage == "OK") {
            if (cb) cb()
            console.log("Successfully sent message to recipient %s", recipientId);
        } else {
            handleError(recipientId, userSession, file_path, `${locales.file_send_error[userSession.lang]} : ${res.statusMessage}`, err_cb)
        }
        return;
    });
}

function handleError(recipientId, userSession, file_path, message, err_cb) {
    if (err_cb) err_cb()
    else {
        sendDivertissementMenuQuickReply(recipientId, userSession, message)

        fs.unlink(file_path, function (error) {
            if (error) {
                throw error;
            }
            console.log('Deleted filename', file_path);
        })
        console.log("Unable to send message to recipient %s", recipientId);
    }
}
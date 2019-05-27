import ytdl from 'ytdl-core'
import fs from 'fs'
import {
    sendAudioFile,
    sendDivertissementMenuQuickReply,
    sendTextMessage
} from '../../senders';
import locales from '../../../locales/data'
import path from 'path'
export default function (senderID, userSession, payload) {
    let options = {
        quality: 'lowestaudio',
        filter: 'audioonly'
    }
    let audio_filename = `${new Date().getTime()}${senderID}_audio.mp3`
    let audio_path = `./temp/Youtube/Audios/${audio_filename}`

    console.log('downloading audio...');
    var ws = fs.createWriteStream(`${audio_path}`)
    ws.on('close', function () {
        sendTextMessage(senderID,`[Audio] : ${payload.title}`)
        sendAudioFile(senderID, userSession, audio_path, function () {
            sendDivertissementMenuQuickReply(senderID,userSession, locales.back_to_main_menu_after_youtube[userSession.lang], function () {
                fs.unlink(audio_path, function (error) {
                    if (error) {
                        throw error;
                    }else{
                        console.log('Deleted', audio_filename);
                    }
                })
            })
        }, audio_path)
    })
    ytdl(payload.url,options).pipe(ws)

}
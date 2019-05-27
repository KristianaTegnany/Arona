import ytdl from 'ytdl-core'
import fs from 'fs'
import {
    sendAudioFile,
    sendDivertissementMenuQuickReply,
    sendTextMessage
} from '../../senders';
import locales from '../../../locales/data'
import path from 'path'
import sendVideoFile from '../../senders/youtube/sendVideoFile';
import VideoLib from 'node-video-lib'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
function saveVideo(listbuffer,outuput){
    let  bufferTotal = Buffer.concat(listbuffer)
    let wstream = fs.createWriteStream(outuput);
    wstream.write(bufferTotal);
    wstream.end()
}

export default function (senderID, userSession, payload) {
    // let options = {
    //     quality: 'highest'
    // }
    let senderIdAndTimestamp = `${new Date().getTime()}${senderID}`
    let video_path = `./temp/Youtube/Videos/${senderIdAndTimestamp}_video.mp4`
    let video_path_only = `./temp/Youtube/Videos/${senderIdAndTimestamp}`
    console.log(video_path)
    // sendAudioFile(senderID, userSession, '3.mp4', function () {
    //             console.log('Finished')
    // })


    console.log('downloading video...');
    var ws = fs.createWriteStream(`${video_path}`)
    ws.on('close', function () {
        // sendTextMessage(senderID,payload.title)
        const SIZE_LIMIT = 22349628
        let file_size = fs.statSync(video_path).size
        console.log(file_size)
        if (file_size < SIZE_LIMIT) {
            sendTextMessage(senderID, `[Video] : ${payload.title}`)
            forceSendVideo(senderID, userSession, video_path, function () {
                sendDivertissementMenuQuickReply(senderID,userSession, locales.back_to_main_menu_after_youtube[userSession.lang], function () {
                    fs.unlink(video_path, function (error) {
                        if (error) {
                            throw error;
                        }
                        console.log('Deleted', senderIdAndTimestamp);
                    })
                })
                console.log("sent");
            })
        } else {
            mkdirp(video_path_only, function (err) {
                fs.open(video_path, 'r', function(err, fd) {
                    let number = 0;
                    try {
                        let movie = VideoLib.MovieParser.parse(fd);
                        console.log(movie.size());
                        let splitsize = 6000000
                        let fragmentList = VideoLib.FragmentListBuilder.build(movie,1);
                        console.log(fragmentList.count());
                        let allbufferRead = 0 ;
                        let bufferList = []
                        for (let i = 0; i < fragmentList.count(); i++){
                            let fragment = fragmentList.get(i);
                            let sampleBuffers = VideoLib.FragmentReader.readSamples(fragment, fd);
                            let buffer = VideoLib.HLSPacketizer.packetize(fragment, sampleBuffers);
                
                            if((allbufferRead < splitsize) && (allbufferRead + buffer.byteLength <= splitsize)){
                                bufferList.push(buffer)
                                allbufferRead += buffer.byteLength 
                            }
                            else{
                                saveVideo(bufferList,`${video_path_only}/${number}.mp4`)
                                allbufferRead = 0 ;
                                bufferList = [buffer]
                                number += 1;
                            }
                        }
                        if(bufferList.length > 0){
                            saveVideo(bufferList,`${video_path_only}/${number}.mp4`)
                        }
                        
                    } catch (ex) {
                        console.error('Error:', ex);
                    } finally {
                        fs.closeSync(fd);
                        
                        fs.readdir(video_path_only, (err, files) => {
                            sendTextMessage(senderID, locales.parts[userSession.lang].format(files.length), function () {
                                fs.unlink(video_path, function () {
                                    sendRecursiveVideo(senderID, userSession, video_path_only, number, 0, function () {
                                        rimraf(video_path_only, function () {
                                            
                                        })
                                    })
                                })
                            })
                        });
                    }
                });
            })
        }
    })
    ytdl(payload.url).pipe(ws)

}

function sendRecursiveVideo(senderID, userSession, video_path_only, length, i, cb) {
    console.log(length)
    if (i != length) {
        sendVideoFile(senderID, userSession, `${video_path_only}/${i}.mp4`,function () {
            fs.unlink(`${video_path_only}/${i}.mp4`, function(error){
                if(error) throw error;
                else{
                    sendRecursiveVideo(senderID, userSession, video_path_only, length, i+1, cb)
                }

            })
        }, function () {
            sendRecursiveVideo(senderID, userSession, video_path_only, length, i, cb)
        })
    } else {
        forceSendVideo(senderID, userSession,`${video_path_only}/${i}.mp4`, cb )
    }
}

function forceSendVideo(senderID, userSession, filename, cb){
    sendVideoFile(senderID, userSession, filename, cb, function () {
        forceSendVideo(senderID, userSession, filename, cb)
    })
}
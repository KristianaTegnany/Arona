import image_moderation from 'image-moderation'
import urlToImage from 'url-to-image'
import path from 'path'
import {
    sendTextMessage,
    sendMainMenuQuickReply,
    sendImageFile
} from '../../senders';
import locales from '../../../locales/data'
import {
    unlink
} from 'fs';
import webshot from 'webshot'
const SAFE = 96.0
export default function (senderID, userSession, payload, cb) {
    let url = payload.url
    urltoImageModeration(senderID, userSession, payload, cb)
}


function urltoImageModeration(senderID, userSession, payload, cb) {
    let url = payload.url
    let title = payload.title
    let options = {
        screenSize: {
            width: 1600,
            height: 900
        },
        shotSize: {
            width: 1600,
            height: 'all'
        },
        quality: 80
    };
    //GET IMAGE CAPTURE
    let fileName = `${new Date().getTime()}${senderID}.png`
    let file = `./temp/Screenshoots/${fileName}`
    webshot(url, file, options, function (err) {

        if (err) {
            console.log(err)
            console.log("url to image error")
            sendMainMenuQuickReply(senderID, userSession, locales.page_unscreenshootable[userSession.lang])
        } else {
            let img_url = `${process.env.currentUrl}/screenshoots/${fileName}`
            console.log(img_url);

            image_moderation.evaluate(img_url).then((response) => {
                console.log(response);

                var json = JSON.parse(response);
                if (!json.error) {
                    let image_safe = json.predictions.everyone
                    if (image_safe >= SAFE) {
                        sendImageFile(senderID, img_url, function () {
                            sendMainMenuQuickReply(senderID, userSession, `${title}\n\n${locales.view_online[userSession.lang]} : ${url}`, function () {
                                unlink(file, function () {
                                    //    sendMainMenuQuickReply(senderID,userSession, locales.ask_web_google_search_keyword[userSession.lang])
                                })
                            })
                        })
                        //On peut envoyer l'images ici  
                    } else {
                        console.log("UNSAFE IMAGE")
                        sendMainMenuQuickReply(senderID, userSession, `${title}\n\n${locales.abusiveContent[userSession.lang]} : ${url}`, function () {
                            unlink(file, function () {
                                //    sendMainMenuQuickReply(senderID,userSession, locales.ask_web_google_search_keyword[userSession.lang])
                            })
                        })
                    }
                } else {
                    console.log("json error")
                    sendMainMenuQuickReply(senderID, userSession, locales.abusiveContent[userSession.lang], function () {
                        unlink(file, function () {
                            //    sendMainMenuQuickReply(senderID,userSession, locales.ask_web_google_search_keyword[userSession.lang])
                        })
                    })
                }
            });
        }

    })
}
import translate from 'node-google-translate-skidz'
import {
    sendTextMessage, sendMainMenuQuickReply
} from '../../senders';
import locales from '../../../locales/data'
export default function (senderID, userSession) {

    if (/^(\S+)\s*to\s*(\S+)\s*:\s*([\S\s]+)$/i.test(userSession.translate)) {
        var source = RegExp.$1.toLowerCase()
        var target = RegExp.$2.toLowerCase()
        var messageToTranslate = RegExp.$3.toLowerCase()

        console.log(source, target, messageToTranslate)

        translate({
            text: messageToTranslate,
            source,
            target
        }, function (result) {
            if(result)
            sendMainMenuQuickReply(senderID,userSession, result.translation)
        });

    } else if (/^to\s*(\S+)\s*:\s*([\S\s]+)$/i.test(userSession.translate)) {
        var target = RegExp.$1
        var messageToTranslate = RegExp.$2
        console.log(target, messageToTranslate)

        translate({
            text: messageToTranslate,
            target
        }, function (result) {
            if(result)
            sendMainMenuQuickReply(senderID,userSession, result.translation)
        });

    } else if (userSession.translate.toLowerCase() == "help") {
        sendMainMenuQuickReply(senderID,userSession, locales.help_translate[userSession.lang])
    } else if (userSession.translate.toLowerCase() == "tags"){
        sendMainMenuQuickReply(senderID,userSession, locales.tags_translate[userSession.lang])

    } else {
        translate({
            text: userSession.translate,
            target: "en"
        }, function (en) {
            if (en && en.ld_result) {
                var srclangs = en.ld_result.srclangs
                for (let index = 0; index < srclangs.length; index++) {

                    const element = srclangs[index];

                    if (element == "en") {
                        translate({
                            text: userSession.translate,
                            target: "fr"
                        }, function (fr, err) {
                            translate({
                                text: fr.translation,
                                source: "fr",
                                target: "en"
                            }, function (en) {
                                if (en)
                                sendMainMenuQuickReply(senderID,userSession, "(" + element + ")\n" + en.translation)
                            })
                        })
                    } else {
                        translate({
                            text: en.translation,
                            target: element
                        }, function (en) {
                            sendMainMenuQuickReply(senderID,userSession, "(" + element + ")\n" + en.translation)
                        })
                    }
                }
            }

        })

    }

}
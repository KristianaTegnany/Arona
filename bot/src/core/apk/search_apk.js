import cmd from 'node-cmd'
import fs from 'fs'
import locales from '../../../locales/data'
import {
    sendApkFile,
    sendTextMessage,
    sendApkSuggsQuickReply,
    sendApkSearchResult
} from '../../senders';
import process_apk from './process_apk'
import gplay from 'google-play-scraper'

function recursiveApp(senderID, userSession, apps, i) {
    if (apps.length != i) {
        gplay.app({
                appId: apps[i].appId
            })
            .then((detail) => {
                userSession.appSearchList.push({
                    id: apps[i].appId,
                    title: detail.title,
                    image: detail.headerImage,
                    description: detail.summary,
                })
                recursiveApp(senderID, userSession, apps, i + 1)
            });
    } else {
        // console.log(userSession.appSearchList)
        sendApkSearchResult(senderID, userSession,userSession.appSearchList, function () {
            
        } )
    }
}
export default function (senderID, userSession, keyword) {

    let apk_folder = `./temp/Apk`
    console.log("search apk file", keyword)
    userSession.appSearchList = []
    gplay.search({
        term: keyword,
        num: 10
    }).then((apps) => {
        recursiveApp(senderID, userSession, apps, 0)
    });


    // cmd.get(
    //     `cd ${apk_folder} && apk "${keyword}"`,
    //     function (err, data, stderr) {
    //         console.log(data)
    //         if (/No APK found with package name ([\s\S]*)\nDid you mean ([\s\S]*)\n/i.test(data)) {
    //             let packageSuggs = RegExp.$2
    //             console.log(RegExp.$2)
    //             sendApkSuggsQuickReply(senderID, userSession, `${locales.apk_suggs[userSession.lang]}`.format(keyword, packageSuggs), packageSuggs, function () {

    //             })
    //         } else if (/Download Successful!/.test(data)) {
    //             console.log("downloaded file", keyword)
    //             let filename = `${keyword}.apk`
    //             process_apk(senderID, userSession, `${apk_folder}/${filename}`, filename, function () {

    //             })

    //             // fs.rename(`./temp/Apk/${keyword}.apk`,`./temp/Apk/${apk_filename}.apk` )

    //         } else if(/One at a Time!/.test(data)) {
    //             // sendApkSuggsQuickReply(senderID, userSession, locales.apk_match[userSession.lang].format(packageSuggs))
    //         }
    //     }
    // );
}

String.prototype.format = function () {
    var i = 0,
        args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};
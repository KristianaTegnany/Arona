import cmd from 'node-cmd'
import process_apk from './process_apk'
import locales from '../../../locales/data'
import {
    sendApkFile,
    sendTextMessage,
    sendApkSuggsQuickReply
} from '../../senders';
export default function (senderID, userSession, packageName, cb) {
    let apk_folder = `./temp/Apk/`
    console.log(packageName)
    cmd.get(
        `cd ${apk_folder} && apk "${packageName}"`,
        function (err, data, stderr) {
            console.log(data)
            if (/No APK found with package name ([\s\S]*)\nDid you mean ([\s\S]*)\n/i.test(data)) {
                let packageSuggs = RegExp.$2
                console.log(RegExp.$2)
                sendApkSuggsQuickReply(senderID, userSession, `${locales.apk_suggs[userSession.lang]}`.format(packageName, packageSuggs), packageSuggs, function () {

                })
            } else if (/Download Successful!/.test(data)) {
                console.log("downloaded file", packageName)
                let filename = `${packageName}.apk`
                process_apk(senderID, userSession, `${apk_folder}/${filename}`, filename, function () {

                })

                // fs.rename(`./temp/Apk/${packageName}.apk`,`./temp/Apk/${apk_filename}.apk` )

            } else if(/One at a Time!/.test(data)) {
                // sendApkSuggsQuickReply(senderID, userSession, locales.apk_match[userSession.lang].format(packageSuggs))
            }
        }
    );

    // cmd.get(`cd ${apk_folder} && apk "${packageName}"`,
    //     function (err, data, stderr) {
    //         if (/Download Successful!/.test(data)) {
    //             console.log("downloaded file", packageName)
    //             let filename = `${packageName}.apk`
    //             process_apk(senderID, userSession, `${apk_folder}/${filename}`, filename, function () {
    //             })
    //         }
    //     })
}
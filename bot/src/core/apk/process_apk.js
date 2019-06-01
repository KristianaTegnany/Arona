import splitFile from 'split-file'
import fs from 'fs'
import filesize from 'filesize'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import {
    sendTextMessage,
    sendApkFile
} from '../../senders';
import locales from '../../../locales/data'

const LIMIT = 25000000
export default function (senderID, userSession, apk_filepath, filename, cb) {
    let size = fs.statSync(apk_filepath).size
    let humanSize = filesize(fs.statSync(apk_filepath).size)
    console.log(size)
    sendTextMessage(senderID, `${locales.apk_size[userSession.lang]} ${humanSize}`, function () {
        if (size < LIMIT) {
            forceSendApk(senderID, userSession, apk_filepath, function () {
                fs.unlink(apk_filepath, function (error) {
                    if (error) {
                        throw error;
                    } else {
                        if (cb) cb()
                        console.log('Deleted', apk_filepath);
                    }
                })
            })
        } else {
            let apk_in_folder = `./temp/Apk/${new Date().getTime()}${senderID}`

            mkdirp(apk_in_folder, function (err) {
                fs.rename(apk_filepath, `${apk_in_folder}/${filename}`, function () {
                    apk_filepath = `${apk_in_folder}/${filename}`
                    splitFile.splitFileBySize(apk_filepath, LIMIT)
                        .then((names) => {
                            sendTextMessage(senderID, locales.parts[userSession.lang].format(names.length), function () {
                                fs.unlink(apk_filepath, function () {
                                    sendApkRecursive(senderID, userSession, names, 0, function () {
                                        rimraf(apk_in_folder, function () {
                                            if (cb) cb()
                                        })
                                    }, function () {
                                        rimraf(apk_in_folder, function () {
                                            sendTextMessage(senderID, "Réessayer")
                                        })
                                    })
                                })
                            })
                        })
                        .catch((err) => {
                            console.log('Error: ', err);
                        });
                })
            });
        }

    })
}

function sendApkRecursive(senderID, userSession, names, i, cb, err_cb) {
    let newName = `${names[i]}.apk`
    fs.rename(names[i], newName, function () {
        sendApkFile(senderID, userSession, newName, function () {
            fs.unlink(newName, function (error) {
                if (error) {
                    throw error;
                } else {
                    if (i != names.length - 2) {
                        sendApkRecursive(senderID, userSession, names, i + 1, cb, function () {
                            sendApkRecursive(senderID, userSession, names, i, cb, err_cb)
                        })
                    } else {
                        sendLastApkFile(senderID, userSession, names[i + 1], cb)

                    }
                }
            })
        }, function () {
            sendApkRecursive(senderID, userSession, names, i, cb, err_cb)
        })
    })
}

function sendLastApkFile(senderID, userSession, filename, cb) {
    let newName = `${filename}.apk`
    fs.rename(filename, newName, function () {
        sendApkFile(senderID, userSession, newName, cb, function () {
            sendLastApkFile(senderID, userSession, filename, cb)
        })
    })
}
function forceSendApk(senderID, userSession, filename, cb) {
    sendApkFile(senderID, userSession, filename, cb, function () {
        forceSendApk(senderID, userSession, filename, cb)
    })
}
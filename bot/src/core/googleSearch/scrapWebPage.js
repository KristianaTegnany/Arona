import scrape from 'website-scraper'
import zipFolder from 'zip-folder'
import rimraf from 'rimraf'
import sendFile from '../../senders/sendFile';
import {
    unlink
} from 'fs';
import {
    sendMainMenu,
    sendMainMenuQuickReply,
    sendTextMessage
} from '../../senders';
import locales from '../../../locales/data'
export default function (senderID, userSession, payload) {
    let url = payload.url
    let title = payload.title
    let uniqueId = `${new Date().getTime()}${senderID}`
    let savedPageFolder = `./temp/SavedPages/${uniqueId}`
    console.log("scrapping page...")
    scrape({
        urls: [url],
        directory: savedPageFolder,
        sources: [{
                selector: 'img',
                attr: 'src'
            },
            {
                selector: 'link[rel="stylesheet"]',
                attr: 'href'
            },
            {
                selector: 'script',
                attr: 'src'
            }
        ]
    }).then(function () {
        let archivedPageLocation = `./temp/ArchivedPages/${uniqueId}.zip`
        console.log("archiving page...")
        zipFolder(savedPageFolder, archivedPageLocation, function (err) {
            if (err) {
                sendMainMenuQuickReply(senderID, userSession, locales.page_unzipable[userSession.lang])
            } else {
                console.log("sending page...")
                sendFile(senderID, userSession, archivedPageLocation, function () {
                    console.log("remove page temp...")
                    unlink(archivedPageLocation, function () {
                        sendMainMenuQuickReply(senderID, userSession, `${title}\n\n${locales.view_online[userSession.lang]} : ${url}`)
                    })
                })
            }
            rimraf(savedPageFolder, function () {});
            // cb(`${titleAndTime}.zip`)
            // // Remove asynchronously
        });
    }).catch(function (err) {
        console.log(err)
        console.log("webscrapping error")
        sendMainMenuQuickReply(senderID, userSession, locales.page_unscrappable[userSession.lang])
    });
}
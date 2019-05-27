import { sendArchivedPage } from './sendArchivedPage'
const isUrl = require('is-url')
const fs = require('fs')


module.exports = (message, senderID, sendMessageData) => {

    console.log(message)
    sendMessageData(senderID, 
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "First card",
                        "subtitle": "Element #1 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.messenger.com",
                            "title": "web url"
                        }, {
                            "type": "postback",
                            "title": "Postback",
                            "payload": "first generic",
                        }],
                    }, {
                        "title": "Second card",
                        "subtitle": "Element #2 of an hscroll",
                        "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                        "buttons": [{
                            "type": "postback",
                            "title": "Postback",
                            "payload": "Payload for second element in a generic bubble",
                        }],
                    }]
                }
            }
        }
        )
    /*
    if (isUrl(message)) {
        sendArchivedPage(message, function (zipFile) {
            sendMessageData(senderID, {
                    attachment: {
                        type: "file",
                        payload: {
                            url: `${process.env.currentUrl}/${zipFile}`
                        }
                    }
                }, function () {
                    fs.unlinkSync(`./temp/archives/${zipFile}`);
                }

            )
        })
    }else if(message.toLowerCase() == "merge"){
        fs.readdir("./temp/merge/", (err, files) => {

            for (let i = 0; i < files.length; i++) {
                const e = files[i];
                console.log(`${process.env.currentUrl}/${e}`)    

                sendMessageData(senderID, {
                    attachment: {
                        type: "file",
                        payload: {
                            url: `${process.env.currentUrl}/${e}`
                        }
                    }
                })
            }
        })

    }else{
        console.log("this is not a url.")
    }*/
}
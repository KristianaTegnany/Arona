import {
    receivedMessage,
    receivedPostback,
    receivedQuickReply
} from '../receivers'
import {
    repairSession
} from '../sessions'
import setDefaultSessions from '../sessions/default'
import redisClient from '../sessions/redisClient'
import defaultSession from '../sessions/defaultSession'
const router = require('express').Router()

router.get('/', function (req, res) {
    console.log("webhook")
    if (req.query['hub.verify_token'] === process.env.verifyToken) {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

router.post('/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        
        redisClient.get(sender, function (err, reply) {
            let object = JSON.parse(reply)
            let userSession
            if (object && !isEmpty(object)) {
                userSession = object
            } else {
                redisClient.set(sender, JSON.stringify(defaultSession))
                userSession = defaultSession
            }
            // console.log(userSession)
            if (event.message) {
                if (event.message.quick_reply) {
                    receivedQuickReply(event, userSession)
                } else {
                    receivedMessage(event, userSession)
                }
            } else if (event.postback) {
                receivedPostback(event, userSession)
            } else if (event.read) {

            } else if (event.account_linking) {

            } else if (event.delivery) {

            } else {
                console.log("Webhook received unknown messagingEvent: ", messagingEvent);
            }

        })

    }
    res.sendStatus(200)
})


module.exports = router;


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
import sendFile from './sendFile'

function forceSendFile(senderID, userSession, filename, cb) {
    sendFile(senderID, userSession, filename, cb, function () {
        forceSendFile(senderID, userSession, filename, cb)
    })
}
export default forceSendFile
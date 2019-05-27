const request = require('request')
export default function (sender, msgData, cb) {
    const token = process.env.accessToken
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: token
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            message: msgData,
        }
    }, function (error, response, body) {
        if (cb) {
            cb(response.body.error, response)
        }
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        } else {}
    })
}
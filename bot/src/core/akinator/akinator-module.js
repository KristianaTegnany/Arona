import request from 'request'

function startGame(userId, lang, callback) {
    var options = {
        url: `${process.env.akinatorServerUrl}/start`,
        method: 'POST',
        form: {
            "userId": userId,
            "lang": lang
        },
        json: true,
    };
    request(options, function (error, response, body) {
        if (callback) {
            callback(error, body, )
        }
    });
}


function runGame(userId, lang, answer, callback) {
    var options = {
        url: `${process.env.akinatorServerUrl}/games`,
        method: 'POST',
        form: {
            "userId": userId,
            "lang": lang,
            "answer": answer
        },
        json: true,
    };
    request(options, function (error, response, body) {
        if (callback) {
            callback(error, body)
        }
    });
}

export {
    startGame,
    runGame
}
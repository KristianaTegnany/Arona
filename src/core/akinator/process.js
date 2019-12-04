import {
    startGame,
    runGame
} from './akinator-module'


startGame(userId, lang, function (err, body) {
    // recursiveQuestion(body);
    se
})
runGame(userId, lang, answer, function (err, body) {
    if (body.win) {
        console.log(body)
    } else {
        body
    }
})

// function recursiveQuestion(body) {
//     const readline = require('readline').createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//     readline.question(body.question + '\n' + JSON.parse(body.suggestion).join('\n') + '\n==> ', (answer) => {
//         runGame(userId, lang, answer, function (err, body) {
//             if (body.win) {
//                 console.log(body)
//             } else {
//                 recursiveQuestion(body)
//             }
//         })
//         readline.close()
//     })
// }
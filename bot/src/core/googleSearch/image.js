import image_moderation from 'image-moderation'
import urlToImage from 'url-to-image'
import bing from 'nodejs-bing'
import {
    setter
} from '../../sessions';
import {
    sendImageSuggs,
    sendMainMenuQuickReply
} from '../../senders';
import locales from '../../../locales/data'
const SAFE = 90.0

export default function (senderID, userSession, userInput, cb) {
    try {
        bing.image(userInput).then(function (results) {
            sendImageSuggs(senderID, userSession, results, cb)

        })
    } catch (error) {
        sendMainMenuQuickReply(senderID,userSession, locales.retry[userSession.lang])
    }
}

function imageSearch(senderID, userSession, userInput, cb) {
    google.list({
            keyword: userInput,
            num: 10,
            detail: true,
            nightmare: {
                show: false
            }
        })
        .then(function (results) {
            userSession = {
                ...userSession,
                imagesSearch: []
            }
            setter(senderID, userSession)
            imageRecursive(senderID, userSession, results, 0)
            // console.log('first 10 results from google', results);
        }).catch(function (err) {
            console.log('err', err);
        });

}

function imageRecursive(senderID, userSession, results, i) {
    // console.log(i)
    if (i < results.length) {
        var image_url = results[i].url
        // Image nudity verification 
        image_moderation.evaluate(image_url).then((response) => {
            var json = JSON.parse(response);
            if (!json.error) {
                var image_safe = json.predictions.everyone
                if (image_safe >= SAFE) {
                    userSession.imagesSearch.push(results[i].url)
                    setter(senderID, userSession)
                }
            }
            imageRecursive(senderID, userSession, results, i + 1)
        });
    } else {
        console.log(userSession.imagesSearch.length)
        //Envoyer les resultats dans le tableau "retour"
    }
}

//IMAGE DOWNLOAD AND FILTER AND SEND AND REMOVE
function urltoImageModeration(dmain, url) {
    //GET IMAGE CAPTURE
    urlToImage(url, __dirname + '/public/images/' + url + '.png').then(function () {
        var img_url = domain + '/images/' + url + '.png'
        image_moderation.evaluate(img_url).then((response) => {
            var json = JSON.parse(response);
            var image_safe = json.predictions.everyone
            if (image_safe >= SAFE) {
                //On peut envoyer l'images ici  
            }
        });

    }).catch(function (err) {
        console.error(err);
    });
}
import image_moderation from 'image-moderation'
import urlToImage from 'url-to-image'
import path from 'path'

export default function (senderID, userSession, url, cb) {
    urltoImageModeration(senderID, url)

}


function urltoImageModeration(senderID, url) {
    //GET IMAGE CAPTURE
    let file = `./temp/Screenshoots/${new Date().getTime()}${senderID}.png`

    console.log(path.resolve(file))
    urlToImage(url, file).then(function (err) {
        if (err) throw err
        else{
            image_moderation.evaluate(img_url).then((response) => {
                var json = JSON.parse(response);
                var image_safe = json.predictions.everyone
                if (image_safe >= SAFE) {
                    //On peut envoyer l'images ici  
                }
            });
        }
        // var img_url = domain + '/images/' + url + '.png'
        // image_moderation.evaluate(img_url).then((response) => {
        //     var json = JSON.parse(response);
        //     var image_safe = json.predictions.everyone
        //     if (image_safe >= SAFE) {
        //         //On peut envoyer l'images ici  
        //     }
        // });

    }).catch(function (err) {
        console.error(err);
    });
}
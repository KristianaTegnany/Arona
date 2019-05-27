import search from 'youtube-search'
import ytSearch from 'yt-search'
import {
    setter
} from '../../sessions'
import {
    sendYoutubeSuggs, sendDivertissementMenuQuickReply
} from '../../senders'
import ytdl from 'ytdl-core'
// let infos = []
// let opts = {
//     maxResults: 5,
//     key: process.env.youtubeApiKey
// }
export default function (senderID, userSession, page=1) {
    const opts = {
        query: userSession.youtube,
        pageStart: page, // first youtube page result
        pageEnd: page+1 // up until page 3
    }

    ytSearch(opts, function (err, r) {
        if (err) throw err

        const videos = r.videos
        userSession = {...userSession,
            youtubeInfo : []
        }
        let results = []
        const LIMIT = 5
        for (let i = 0; i < videos.length; i++) {
            const element = videos[i];
            results.push(element)
            if (i == LIMIT) {
                break
            }
        }
        // userSession.youtube = true
        // setter(senderID, userSession)

        getRecursiveInfo(senderID, userSession, results, 0, page)
        // console.log("soratra kely",results);
    })
    
        }
        
function getRecursiveInfo(senderID, userSession, videos, i, page) {
    if (i != videos.length) {
        ytdl.getInfo(videos[i].videoId, (err, info) => {
            if (!err) {
                // sendDivertissementMenuQuickReply(senderID, userSession, locales.youtube_search_error[userSession.lang])
                userSession.youtubeInfo.push({
                    title : info.title,
                    length_seconds : info.length_seconds,
                    thumbnail_url : info.thumbnail_url,
                    description : info.player_response.videoDetails.shortDescription
                })
                getRecursiveInfo(senderID, userSession, videos, i + 1, page)
            }
        })
        
    } else {
        sendYoutubeSuggs(senderID, userSession, videos, userSession.youtubeInfo, page)
        userSession.youtubeInfo = []
    }
    setter(senderID, userSession)
}
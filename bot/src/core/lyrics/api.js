import api from 'genius-api'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
let genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

api.prototype.getSongLyrics = function getSongLyrics(geniusUrl) {
    return fetch(geniusUrl, {
            method: 'GET',
        })
        .then(response => {
            if (response.ok) return response.text()
            throw new Error('Could not get song url ...')
        })
        .then(parseSongHTML)
}

function parseSongHTML(htmlText) {
    const $ = cheerio.load(htmlText)
    const lyrics = $('.lyrics').text()
    const releaseDate = $('release-date .song_info-info').text()
    return {
        lyrics,
        releaseDate,
    }
}
export {
    api,
    genius
}
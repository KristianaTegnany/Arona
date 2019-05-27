import {
  genius
} from './api'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import {
  sendSongLyricsList
} from '../../senders'


export default function (senderID, userInput, userSession) {
  genius.search(userInput).then(function (response) {
    console.log(response)
    sendSongLyricsList(senderID, userSession, response.hits)
  });
}
require('dotenv').load();
import callSendAPI from "./callSendAPI";
import locales from "../../locales/data";
export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        image_aspect_ratio: "square",
        elements: [
          {
            title: locales.arona_plus[lang],
            image_url: 'https://medias3.prestastore.com/835054-pbig/chat-bot-for-social-networking.jpg',
            buttons: [
              {
                type: "postback",
                title: locales.akinator[lang],
                payload: "akinator"
              },
              {
                type: "postback",
                title: locales.lyrics[lang],
                payload: "lyrics"
              },
              {
                type: "postback",
                title: locales.video_amusant[lang],
                payload: "video"
              }
            ]
          },
          {
            title: locales.google[lang],
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDPRw6YeKWJpC0fJzC8xrb5OBTGR1UoD9zfXwF8hrANGvCWvSY&s',
            buttons: [
              {
                type: "postback",
                title: locales.video_musique[lang],
                payload: "youtube"
              },
              {
                type: "postback",
                title: locales.google_search[lang],
                payload: "google_search"
              },
              {
                type: "postback",
                title: locales.translate[lang],
                payload: "translate"
              }
              /*,
              {
                type: "postback",
                title: locales.download_apk[lang],
                payload: "download_apk"
              }*/
            ]
          }/*,
          {
            title: locales.services[lang],
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzu7Hg3kWXVC-pfoG4ENdIiah5lpi-SyoWvf_S99pjeYQcYMl&s',
            subtitle: "Lettre et SMS",
            buttons: [
              {
                type: "postback",
                title: locales.letter_model[lang],
                payload: "letter_model"
              },
              {
                type: "postback",
                title: locales.send_sms[lang],
                payload: "sms"
              }
            ]
          }*/,
          {
            title: locales.services[lang],
            image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQckT6DDkARh49KXxb6LNX9sDQx8i2AFubbkcb9xLenYzUGOSN&s',
            buttons: [
              {
                type: "postback",
                title: locales.bus[lang],
                payload: "bus"
              },
              {
                type: "postback",
                title: locales.urgence[lang],
                payload: "urgence"
              },
              {
                type: "postback",
                title: locales.send_sms[lang],
                payload: "sms"
              }
            ]
          }
        ]
      }
    }
  };

  callSendAPI(recipientId, messageData);
}

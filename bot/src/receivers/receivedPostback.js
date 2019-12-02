import {
  sendTextMessage,
  sendDivertissementMenu,
  sendServicesMenu,
  sendMainMenu,
  sendUrgenceAction,
  sendAmbulanceListe,
  sendPharmacieListe,
  sendPoliceListe,
  sendPompierListe,
  sendUrgenceMainMenu,
  sendSearchTypeQuickReply,
  sendImageFile,
  sendMainMenuQuickReply,
  sendPageScreenshoot,
  sendHomeMessageQuickReply,
  sendQuickReplyAfterApkSent,
  sendAronaPlusQuickReply,
  sendServicesQuickReply,
  sendGoogleQuickReply
} from "../senders";
import { getter, setter } from "../sessions";
import client from "../sessions/redisClient";
import locales from "../../locales/data";
import validUrl from "valid-url";
import lyric from "../core/lyrics/lyric";
import scrapWebPage from "../core/googleSearch/scrapWebPage";
import saveVideo from "../core/youtube/saveVideo";
import saveAudio from "../core/youtube/saveAudio";
import verifyPageContent from "../core/googleSearch/verifyPageContent";
import generateApkInfos from "../core/apk/generateApkInfos";
import genererateScreenshoots from "../core/apk/genererateScreenshoots";
import download_apk from "../core/apk/download_apk";
import { startGame } from "../core/akinator/akinator-module";
import { sendQuestionQuickReply, sendAskNumberSMS } from "../senders";

export default function(event, userSession) {
  let senderID = event.sender.id;
  let recipientID = event.recipient.id;
  let timeOfMessage = event.timestamp;
  let recipient = event.recipient;
  let timestamp = event.timestamp;
  let postback = event.postback;
  if (
    userSession.youtube ||
    userSession.google_search ||
    userSession.lyric ||
    userSession.download_apk
  ) {
    try {
      let payload = JSON.parse(postback.payload);
      // console.log(payload)
      if (validUrl.isUri(payload.url)) {
        switch (payload.type) {
          case "lyric":
            lyric(senderID, userSession, payload);
            break;
          case "video":
            console.log(`Video ${payload.url}`);
            sendTextMessage(senderID, locales.please_wait[userSession.lang]);
            saveVideo(senderID, userSession, payload);

            break;
          case "audio":
            sendTextMessage(senderID, locales.please_wait[userSession.lang]);
            console.log(`Audio ${payload.url}`);
            saveAudio(senderID, userSession, payload);

            break;
          case "download_image":
            sendImageFile(senderID, payload.url, function() {
              sendMainMenuQuickReply(
                senderID,
                userSession,
                locales.ask_image_google_search_keyword[userSession.lang]
              );
            });
            break;
          case "web.screenshoot":
            verifyPageContent(senderID, userSession, payload);
            break;
          case "web.download":
            scrapWebPage(senderID, userSession, payload);
            break;
          default:
            break;
        }
      } else {
        switch (payload.type) {
          case "apk.informations":
            generateApkInfos(
              senderID,
              userSession,
              payload.appId,
              function() {}
            );
            break;
          case "apk.screenshots":
            genererateScreenshoots(
              senderID,
              userSession,
              payload.appId,
              function() {}
            );
            break;
          case "apk.download":
            download_apk(senderID, userSession, payload.appId, function() {
              sendQuickReplyAfterApkSent(
                senderID,
                userSession,
                locales.apk_sent[userSession.lang]
              );
            });
            break;

          default:
            break;
        }
      }
    } catch (error) {
      handlePostback(senderID, postback, userSession);
    }
  } else {
    handlePostback(senderID, postback, userSession);
  }
}

function handlePostback(senderID, postback, userSession) {
  let lang = userSession.lang;
  let new_obj = {};

  switch (postback.payload) {
    case "show.divertissement_menu":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      sendDivertissementMenu(senderID, userSession);
      break;

    case "show.services_menu":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      sendServicesMenu(senderID, userSession);
      break;
    case "main_menu":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      sendMainMenu(senderID, userSession);
      break;
    case "bus":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      //sendTextMessage(senderID, locales.ask_bus_arrival[lang]);

      sendServicesQuickReply(
        senderID,
        userSession,
        locales.ask_bus_arrival[lang],
        "bus"
      );
      getter(senderID, function(obj) {
        obj["bus"] = {
          departure: "",
          arrival: ""
        };
        setter(senderID, obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;

    case "urgence":
      new_obj.lang = userSession.lang;
      new_obj["urgence"] = {
      };
      setter(senderID, new_obj);
      sendUrgenceMainMenu(senderID, userSession);
      break;
    
    case "ambulance":
      new_obj.lang = userSession.lang;
      new_obj["urgence"] = {
        type: "ambulance"
      };
      setter(senderID, new_obj);
      sendAmbulanceListe(senderID, userSession);
      break;
        
    case "pharmacie":
      new_obj.lang = userSession.lang;
      new_obj["urgence"] = {
        type: "pharmacie"
      };
      setter(senderID, new_obj);
      sendPharmacieListe(senderID, userSession);
      break;
    
    case "police":
      new_obj.lang = userSession.lang;
      new_obj["urgence"] = {
        type: "police"
      };
      setter(senderID, new_obj);
      sendPoliceListe(senderID, userSession);
      break;
    
    case "pompier":
      new_obj.lang = userSession.lang;
      new_obj["urgence"] = {
        type: "pompier"
      };
      setter(senderID, new_obj);
      sendPompierListe(senderID, userSession);
      break;
    
    case "letter_model":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      //sendServicesQuickReply(senderID, userSession, locales.ask_letter_type[lang], "letter_model")
      sendServicesQuickReply(
        senderID,
        userSession,
        locales.ask_letter_type[lang],
        "letter "
      );
      getter(senderID, function(obj) {
        let new_obj = {};
        new_obj.lang = obj.lang;
        new_obj["letter_model"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });

      break;
    case "lyrics":
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      sendAronaPlusQuickReply(
        senderID,
        userSession,
        locales.ask_lyric_title[lang],
        "lyrics"
      );
      //sendTextMessage(senderID, locales.ask_lyric_title[lang]);
      getter(senderID, function(obj) {
        let new_obj = {};
        new_obj.lang = obj.lang;
        new_obj["lyric"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "youtube":
      //sendTextMessage(senderID, locales.ask_youtube_search[lang]);
      // sendAronaPlusQuickReply(
      //   senderID,
      //   userSession,
      //   locales.ask_youtube_search[lang],
      //   "youtube"
      // );
      // getter(senderID, function(obj) {
      //   new_obj.lang = obj.lang;
      //   new_obj["youtube"] = true;
      //   setter(senderID, new_obj);
      //   // client.set(senderID, JSON.stringify(obj))
      // });
      break;
    case "translate":
      sendGoogleQuickReply(
        senderID,
        userSession,
        locales.ask_translate[lang],
        "translate"
      );
      //sendTextMessage(senderID, locales.ask_translate[lang]);
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["translate"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "google_search":
      sendSearchTypeQuickReply(
        senderID,
        userSession,
        locales.ask_searchType[lang]
      );
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["google_search"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "akinator":
      startGame(senderID, userSession.lang, function(err, body) {
        sendTextMessage(
          senderID,
          locales.akinator_start[userSession.lang],
          function() {
            sendQuestionQuickReply(senderID, userSession, body.question);
          }
        );
      });
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["akinator"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "sms":
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["sms"] = true;
        setter(senderID, new_obj);
      });
      sendAskNumberSMS(senderID, userSession);
      break;
      
    case "download_apk":
      // getter(senderID, function(obj) {
      //   new_obj.lang = obj.lang;
      //   new_obj["download_apk"] = true;
      //   setter(senderID, new_obj);
      // });

      // sendHomeMessageQuickReply(
      //   senderID,
      //   userSession,
      //   locales.ask_apk_keyword[userSession.lang],
      //   function() {}
      // );
      break;
    default:
      break;
  }
}

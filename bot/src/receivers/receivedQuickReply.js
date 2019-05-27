import {
  sendTextMessage,
  sendDivertissementMenu,
  sendQuickReplyAfterApkSent,
  sendMainMenu,
  sendImageFile,
  sendFinishAkinatorQuickReply,
  forceSendFile,
  sendServicesQuickReply,
  sendSearchTypeQuickReply,
  sendGoogleQuickReply,
  sendHomeMessageQuickReply,
  sendAskNumberSMS
} from "../senders";
import { getter, setter } from "../sessions";
import redisClient from "../sessions/redisClient";
import client from "../sessions/redisClient";
import locales from "../../locales/data";
import verifyPageContent from "../core/googleSearch/verifyPageContent";
import scrapWebPage from "../core/googleSearch/scrapWebPage";
import download_apk from "../core/apk/download_apk";
import processTranslate from "../core/translate/process";
import { runGame, startGame } from "../core/akinator/akinator-module";
import { search } from "../core/youtube";
import sendTypeLetterQuickReply from "../senders/sendServicesQuickReply";
export default function(event, userSession) {
  let senderID = event.sender.id;
  let recipientID = event.recipient.id;
  let timeOfMessage = event.timestamp;
  let recipient = event.recipient;
  let timestamp = event.timestamp;
  let postback = event.postback;
  let message = event.message;
  if (userSession.akinator) {
    switch (message.quick_reply.payload) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        runGame(
          senderID,
          userSession.lang,
          message.quick_reply.payload,
          function(err, body) {
            console.log(body.picture);
            if (body.win) {
              sendImageFile(senderID, body.picture, function() {
                sendFinishAkinatorQuickReply(
                  senderID,
                  userSession,
                  `${locales.your_personage_is[userSession.lang]} ${
                    body.name
                  }\n${body.description}`
                );
              });
              console.log(body);
            } else {
            }
          }
        );
        break;

      default:
        handleQuickReply(senderID, userSession, message);
        break;
    }
  } else if (userSession.youtube) {
    try {
      let payload = JSON.parse(message.quick_reply.payload);
      let page = payload.page;
      search(senderID, userSession, page);
    } catch (error) {
      handleQuickReply(senderID, userSession, message);
    }
  } else {
    handleQuickReply(senderID, userSession, message);
  }
}

function handleQuickReply(senderID, userSession, message) {
  let lang = userSession.lang;
  let quick_reply = message.quick_reply;
  let new_obj = {};
  switch (quick_reply.payload) {
    case "youtube":
      sendTextMessage(senderID, locales.ask_youtube_search[lang]);
      getter(senderID, function(obj) {
        new_obj = {
          lang: obj.lang
        };
        new_obj["youtube"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "lyrics":
      sendTextMessage(senderID, locales.ask_lyric_title[lang]);
      getter(senderID, function(obj) {
        new_obj["lyric"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "akinator":
      startGame(senderID, userSession.lang, function(err, body) {
        sendTextMessage(
          senderID,
          locales.akinator_start[userSession.lang],
          function() {}
        );
      });
      break;

    case "main_menu":
      getter(senderID, function(obj) {
        new_obj = {
          lang: obj.lang
        };
        setter(senderID, new_obj);
        // redisClient.set(senderID, JSON.stringify(new_obj))
        sendMainMenu(senderID, userSession);
      });
      break;
    case "divertissement_menu":
      console.log("divertissement_menu");
      getter(senderID, function(obj) {
        new_obj = {
          lang: obj.lang
        };
        setter(senderID, new_obj);
        // redisClient.set(senderID, JSON.stringify(new_obj))
        sendDivertissementMenu(senderID, userSession);
      });
      break;
    case "google_search.web":
      sendGoogleQuickReply(
        senderID,
        userSession,
        locales.ask_web_google_search_keyword[lang],
        "google_search"
      );
      getter(senderID, function(obj) {
        new_obj = {
          lang: obj.lang
        };
        new_obj["google_search"] = "web";
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "google_search.image":
      sendGoogleQuickReply(
        senderID,
        userSession,
        locales.ask_image_google_search_keyword[lang],
        "google_search"
      );
      getter(senderID, function(obj) {
        new_obj = {
          lang: obj.lang
        };
        new_obj["google_search"] = "image";
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "url_page_download":
      scrapWebPage(senderID, userSession, userSession.searchByUrl);
      break;
    case "url_page_screenshoot":
      verifyPageContent(senderID, userSession, userSession.searchByUrl);
      break;
    case "restart":
      startGame(senderID, userSession.lang, function(err, body) {
        sendTextMessage(
          senderID,
          locales.akinator_start[userSession.lang],
          function() {}
        );
      });
      new_obj["akinator"] = true;
      setter(senderID, new_obj);
      break;
    case "windows":
      let windows_merger_path = "./temp/Apk/mergers/merge-win.pdf";
      sendTextMessage(
        senderID,
        "mbola tsy afaka alefa ny version windows satria lazainy facebook fa virus le .exe"
      );
      // forceSendFile(senderID, userSession, windows_merger_path, function () {

      // })
      break;
    case "macosx":
      let macosx_merger_path = "./temp/Apk/mergers/merge-macos.zip";
      forceSendFile(senderID, userSession, macosx_merger_path, function() {});
      break;
    case "linux":
      let linux_merger_path = "./temp/Apk/mergers/merge-linux.zip";
      forceSendFile(senderID, userSession, linux_merger_path, function() {});
      break;
    case "bus":
      let _new_obj = {};
      _new_obj.lang = userSession.lang;
      setter(senderID, _new_obj);
      sendServicesQuickReply(
        senderID,
        userSession,
        locales.ask_bus_arrival[lang],
        "bus"
      );
      console.log("tonga eto");
      getter(senderID, function(obj) {
        obj["bus"] = {
          departure: "",
          arrival: ""
        };
        setter(senderID, obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;

    case "letter":
      let new_obj = {};
      new_obj.lang = userSession.lang;
      setter(senderID, new_obj);
      //sendServicesQuickReply(senderID, userSession, locales.ask_letter_type[lang], "letter_model")
      sendTypeLetterQuickReply(
        senderID,
        userSession,
        locales.ask_letter_type[lang]
      );

      break;

    case "sms":
      getter(senderID, function(obj) {
        let new_obj = {};
        new_obj.lang = obj.lang;
        new_obj["sms"] = true;
        setter(senderID, new_obj);
      });
      sendAskNumberSMS(senderID, userSession);
      break;

    //Modifications
    case "translate.fr":
      processTranslate(senderID, userSession, "fr");
      break;
    case "translate.en":
      processTranslate(senderID, userSession, "en");
      break;
    case "translate.mg":
      processTranslate(senderID, userSession, "mg");
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
      sendSearchTypeQuickReply(senderID, locales.ask_searchType[lang]);
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["google_search"] = true;
        setter(senderID, new_obj);
        // client.set(senderID, JSON.stringify(obj))
      });
      break;
    case "download_apk":
      getter(senderID, function(obj) {
        new_obj.lang = obj.lang;
        new_obj["download_apk"] = true;
        setter(senderID, new_obj);
      });

      sendHomeMessageQuickReply(
        senderID,
        userSession,
        locales.ask_apk_keyword[userSession.lang],
        function() {}
      );
      break;

    default:
      if (userSession.download_apk) {
        let apk_folder = `./temp/Apk/`;
        let packageName = quick_reply.payload;
        console.log(packageName);
        download_apk(senderID, userSession, packageName, function() {
          sendQuickReplyAfterApkSent(
            senderID,
            userSession,
            locales.apk_sent[userSession.lang]
          );
        });
      }
      break;
  }
}

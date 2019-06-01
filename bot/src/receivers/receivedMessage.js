import {
  sendTextMessage,
  sendMainMenuQuickReply,
  sendWebUrlSearchTypeQuickReply,
  sendSearchTypeQuickReply,
  sendTranslateQuickReply,
  sendGoogleQuickReply
} from "../senders";
import sendMainMenu from "../senders/sendMainMenu";
import { getter, setter, eraser } from "../sessions";
import validUrl from "valid-url";
import showSuggests from "../core/lyrics/showSuggests";
import locales from "../../locales/data";
import busAsking from "../core/busAsking/busAsking";
import searchImage from "../core/googleSearch/image";
import searchWeb from "../core/googleSearch/web";
import search_apk from "../core/apk/search_apk";
import { search } from "../core/youtube";
import numberValidation from "../core/sms/numberValidation";
import textValidation from "../core/sms/textValidation";

export default function(event, userSession) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  // console.log(`Received message for user ${senderID} and page ${recipientID} at ${timeOfMessage} with message: `);

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (isEcho) {
    // Just logging message echoes to console
    console.log(
      "Received echo for message %s and app %d with metadata %s",
      messageId,
      appId,
      metadata
    );
    return;
  }

  if (messageText) {
    if (userSession.lyric) {
      // sendTextMessage(senderID, `Recherche de lyric ${messageText}`)
      showSuggests(senderID, messageText, userSession);
      // delete userSession.lyric_title
      // redisClient.set(senderID, JSON.stringify(userSession))
    } else if (userSession.sms_number) {
      textValidation(senderID, userSession, messageText);
    } else if (userSession.sms) {
      numberValidation(senderID, userSession, messageText);
    } else if (userSession.bus) {
      if (!userSession.bus.departure && !userSession.bus.arrival) {
        setter(senderID, userSession);
        userSession.bus.arrival = messageText;
        setter(senderID, userSession);
        sendTextMessage(senderID, locales.ask_bus_departure[userSession.lang]);
      } else {
        userSession.bus.departure = messageText;
        setter(senderID, userSession);
        let { bus } = userSession;
        busAsking(senderID, userSession, bus.departure, bus.arrival);
      }
    } else if (userSession.google_search) {
      switch (userSession.google_search) {
        case "image":
          searchImage(senderID, userSession, messageText, function() {});
          break;
        case "web":
          if (validUrl.isUri(messageText)) {
            sendWebUrlSearchTypeQuickReply(
              senderID,
              userSession,
              locales.choose_web_url_search_type[userSession.lang]
            );
            userSession.searchByUrl = {
              title: "",
              url: messageText
            };
            setter(senderID, userSession);
          } else {
            searchWeb(senderID, userSession, messageText, function(err, res) {
              if (err) {
                sendGoogleQuickReply(
                  senderID,
                  userSession,
                  locales.abusiveContent[userSession.lang],
                  "google_search"
                );
              }
            });
          }
          break;

        default:
          sendSearchTypeQuickReply(
            senderID,
            locales.ask_searchType[userSession.lang]
          );
          break;
      }
    } else if (userSession.youtube) {
      userSession.youtube = messageText;
      setter(senderID, userSession);
      search(senderID, userSession);
    } else if (userSession.translate) {
      userSession.translate = messageText;
      setter(senderID, userSession);

      sendTranslateQuickReply(
        senderID,
        userSession,
        locales.ask_translate_lang[userSession.lang]
      );
    } else if (userSession.download_apk) {
      search_apk(senderID, userSession, messageText, function() {});
    } else {
      switch (messageText) {
        default:
          sendMainMenu(senderID, userSession);
          break;
      }
    }
  }

  // If we receive a text message, check to see if it matches any special
  // keywords and send back the corresponding example. Otherwise, just echo
  // the text we received.
}

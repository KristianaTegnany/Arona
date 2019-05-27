import callSendAPI from "./callSendAPI";
import locales from "../../locales/data";
export default function(recipientId, userSession) {
  let lang = userSession.lang;
  let messageData = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: locales.arona_plus[lang],
            image_url: `${process.env.currentUrl}/main_menu/arona_plus.png`,
            buttons: [
              {
                type: "postback",
                title: locales.lyrics[lang],
                payload: "lyrics"
              },
              {
                type: "postback",
                title: locales.akinator[lang],
                payload: "akinator"
              },
              {
                type: "postback",
                title: locales.video_musique[lang],
                payload: "youtube"
              }
            ]
          },
          {
            title: locales.google[lang],
            image_url: `${process.env.currentUrl}/main_menu/google.png`,
            buttons: [
              {
                type: "postback",
                title: locales.translate[lang],
                payload: "translate"
              },
              {
                type: "postback",
                title: locales.google_search[lang],
                payload: "google_search"
              },
              {
                type: "postback",
                title: locales.download_apk[lang],
                payload: "download_apk"
              }
            ]
          },
          {
            title: locales.services[lang],
            image_url: `${process.env.currentUrl}/main_menu/arona_services.png`,
            buttons: [
              {
                type: "postback",
                title: locales.bus[lang],
                payload: "bus"
              },
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
          }
          //   {
          //     title: locales.hotel_spa[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.hotels_et_motels[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.chambre_d_hotes[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.maison_d_hotes[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.auto_moto[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.achat_auto_moto[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.pieces_auto_moto[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.station_service_depanneurs_garage[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.location[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.immobilier[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.auto_moto[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.autres[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.loisirs[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.musique[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.evenement[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.spectacles[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.sante_et_bien_etre[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.salon_de_beaute[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.etablissements_medical[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.sport_spa[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.recommandation[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.cadeaux[lang],
          //         payload: "restaurant"
          //       }
          //     ]
          //   },
          //   {
          //     title: locales.etablissements_financieres[lang],
          //     image_url: `${process.env.currentUrl}/main_menu/restaurant.png`,
          //     buttons: [
          //       {
          //         type: "postback",
          //         title: locales.banques[lang],
          //         payload: "restaurant"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.transfert_d_argent[lang],
          //         payload: "fast_food"
          //       },
          //       {
          //         type: "postback",
          //         title: locales.autres_etablissements[lang],
          //         payload: "bar"
          //       }
          //     ]
          //   }
        ]
      }
    }
  };

  callSendAPI(recipientId, messageData);
}

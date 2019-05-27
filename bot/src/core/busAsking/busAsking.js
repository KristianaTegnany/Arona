import generateAllStops from './generateAllStops'
import generateAllDestinations from './generateAllDestinations'
import buildBusTrajects from './buildBusTrajects'
import buildStringResponse from './buildStringResponse'
import didYouMean, {
    ReturnTypeEnums,
    ThresholdTypeEnums
} from 'didyoumean2'
import {
    sendTextMessage
} from '../../senders';
import locales from '../../../locales/data'
import {
    setter
} from '../../sessions'
import sendMainMenuQuickReply from '../../senders/sendMainMenuQuickReply';
export default function (senderID, userSession, departure, arrival) {

    // console.log(departure, arrival);

    const Graph = require('node-dijkstra')
    const route = new Graph()

    let allStops = generateAllStops()
    // console.log(allStops);

    let allDestinations = generateAllDestinations(allStops, departure)
    // Did you mean stop name
    let whatIsTheBus = {}

    departure = didYouMean(departure, allStops)
    arrival = didYouMean(arrival, allStops)

    // console.log(departure, arrival);

    if (departure && arrival) {
        // Graph creation
        for (let i = 0; i < allStops.length; i++) {
            const stops = allStops[i];
            const destinations = allDestinations[i];
            route.addNode(stops, destinations)
        }

        // Calculation of the shortest bus way
        let bestWay = route.path(departure, arrival)

        // Finding what is the bus
        whatIsTheBus = buildBusTrajects(bestWay)

        if (bestWay.length - 1 != whatIsTheBus.length) {
            sendTextMessage(senderID, locales.data_bus_error[userSession.lang], function () {
                sendMainMenuQuickReply(senderID,userSession, locales.back_to_main_menu_after_bus[userSession.lang])

            })
        } else {
            let StringResponse = buildStringResponse(bestWay, whatIsTheBus, userSession)
            sendTextMessage(senderID, StringResponse, function () {
                sendMainMenuQuickReply(senderID,userSession, locales.back_to_main_menu_after_bus[userSession.lang])

            })
        }
        userSession['bus'] = {
            departure: "",
            arrival: ""
        }
        setter(senderID, userSession)
        // Generate the text response

    } else {
        sendTextMessage(senderID, locales.data_bus_error[userSession.lang], function () {
            sendMainMenuQuickReply(senderID,userSession, locales.back_to_main_menu_after_bus[userSession.lang])

        })
    }
    // console.log(whatIsTheBus.length);

}
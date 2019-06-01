import dataBus from '../../../static/Bus/dataBus.json'
import generateAllStops from './generateAllStops.js';
import didYouMean, {ReturnTypeEnums, ThresholdTypeEnums} from 'didyoumean2'
import {
    getter,
    setter,
    eraser
} from '../../sessions'


export default function (senderID, departureInput) {

    let allStops = generateAllStops()
    departureInput = departureInput.toUppercase()
    if (allStops.contains(departureInput)) {
        setter(senderID, 'bus_departure', departureInput)
    } else {

        let sug = didYouMean(departureInput, allStops)
        setter(senderID, 'bus_departure', sug)
    }
}
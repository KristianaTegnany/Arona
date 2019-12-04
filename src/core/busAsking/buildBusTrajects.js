import generatePassingBus from "./generatePassingBus";

export default function (bestWay) {
    let result = []
    if(bestWay){
        for (let i = 0; i < bestWay.length - 1; i++) {
            const departure = bestWay[i];
            const arrival = bestWay[i + 1];
            let busAvailableInDeparture = generatePassingBus(departure)
            for (let ii = 0; ii < busAvailableInDeparture.length; ii++) {
                const b = busAvailableInDeparture[ii];
                const indexOf2 = b.trajets.indexOf(departure) + 1
                let letsbreak = false
                for (let iii = indexOf2; iii < b.trajets.length; iii++) {
                    const t = b.trajets[iii];
                    if (t == arrival) {
                        letsbreak = true
                        result.push(b)
                        break
                    }
                }
                if (letsbreak) {
                    break
                }
            }
        }
    }
    return result
}
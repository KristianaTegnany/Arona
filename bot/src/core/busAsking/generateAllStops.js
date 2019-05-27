import dataBus from '../../../static/Bus/dataBus'
export default function () {
    let stops = []
    for (let i = 0; i < dataBus.length; i++) {
        const bus = dataBus[i];
        for (let ii = 0; ii < bus.trajets.length; ii++) {
            const trajet = bus.trajets[ii];
            if (!stops.includes(trajet)) {
                stops.push(trajet)
            }
        }
    }
    return stops
}
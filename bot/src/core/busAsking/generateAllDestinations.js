import dataBus from "../../../static/Bus/dataBus";
import generatePassingBus from "./generatePassingBus";
export default function(arrets, depart) {
  let destinations = [];
  for (let i = 0; i < arrets.length; i++) {
    const arret = arrets[i];
    let object = {};
    let availableBus = generatePassingBus(arret);
    for (let ii = 0; ii < availableBus.length; ii++) {
      const bus = availableBus[ii];
      const indexOf = bus.trajets.indexOf(depart) + 1;
      for (let iii = indexOf; iii < bus.trajets.length; iii++) {
        const trajet = bus.trajets[iii];
        object[trajet] = 1;
      }
    }
    destinations.push(object);
  }
  return destinations;
}

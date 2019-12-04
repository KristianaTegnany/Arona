import dataBus from "../../../static/Bus/dataBus";

export default function(arg) {
  let output = [];
  for (let i = 0; i < dataBus.length; i++) {
    const bus = dataBus[i];
    for (let j = 0; j < bus.trajets.length; j++) {
      const arret = bus.trajets[j];
      if (arret == arg) {
        output.push(bus);
        break;
      }
    }
  }
  return output;
}

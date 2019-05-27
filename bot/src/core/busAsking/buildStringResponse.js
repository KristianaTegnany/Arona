import locales from '../../../locales/data'
import {
  getter
} from '../../sessions';

String.prototype.format = function () {
  var i = 0,
    args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

export default function (bestWay, whatIsTheBus, userSession) {
  let output = ""

  for (let i = 0; i < bestWay.length - 1; i++) {
    const way = bestWay[i];
    switch (whatIsTheBus[i].trajet_type) {
      case 'LIGNE FERME':
      case 'RETOUR':
      case 'ALLER':
      case 'CIRCUIT FERME':
        output += locales.bus_response[userSession.lang].format(`${whatIsTheBus[i].bus_name}`, bestWay[i], bestWay[i + 1])
        break;
      default:
        output += locales.bus_response[userSession.lang].format(`${whatIsTheBus[i].bus_name} ${whatIsTheBus[i].trajet_type}`, bestWay[i], bestWay[i + 1])
        break;
    }
    if (bestWay[i + 2]) {
      output += locales.bus_after[userSession.lang]
    }
  }
  return capitalizeFirstLetter(output)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
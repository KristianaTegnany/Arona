import dataAmbulance from "../../../static/Urgence/dataAmbulance";

function getAmbulText(ambulances){
    let output = ""
    ambulances.forEach(function(ambulance){
        output = output + "-" + ambulance.nom.charAt(0).toUpperCase() + ambulance.nom.slice(1).toLowerCase() + ": \n" + ambulance.contacts[0] + "\n\n"
    })
    return output
}

export default function() {
    let output = []
    let j = 0
    for (let i = 0; i < dataAmbulance.length; i = i + 2) {
        j = j + 1
        let last_index = i + 2
        if(last_index > dataAmbulance.length)
            last_index = dataAmbulance.length
        
        output.push({
            "title": getAmbulText(dataAmbulance.slice(i, last_index)),
            "subtitle": `Page ${j}/${Math.ceil(dataAmbulance.length/2)}`
        })
    }
    return output;
}
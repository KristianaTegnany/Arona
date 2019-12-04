import dataPharmacie from "../../../static/Urgence/dataPharmacie";

function getPharmText(pharmacies){
    let output = "\n\n"
    pharmacies.forEach(function(pharmacie){
        output = output + '-' + pharmacie.nom.charAt(0).toUpperCase() + pharmacie.nom.slice(1).toLowerCase() + ': \n' + pharmacie.contacts[0] + '\n\n'
    })
    return output
}

export default function() {
    let output = []
    let j = 0
    for (let i = 0; i < dataPharmacie.length; i = i + 10) {
        j = j + 1
        let last_index = i + 10
        if(last_index > dataPharmacie.length)
            last_index = dataPharmacie.length
        
        output.push({
            "title": getPharmText(dataPharmacie.slice(i, last_index)),
            "subtitle": `Page ${j}/${Math.ceil(dataPharmacie.length/10)}`
        })
    }
    return output;
}
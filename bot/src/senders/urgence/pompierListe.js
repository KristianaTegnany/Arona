import dataPompier from "../../../static/Urgence/dataPompier";

function getPompText(pompiers){
    let output = ""
    pompiers.forEach(function(pompier){
        output = output + '-' + pompier.nom.charAt(0).toUpperCase() + pompier.nom.slice(1).toLowerCase() + ': \n' + pompier.contacts[0] + '\n\n'
    })
    return output
}

export default function() {
    let output = []
    let j = 0
    for (let i = 0; i < dataPompier.length; i = i + 10) {
        j = j + 1
        let last_index = i + 10
        if(last_index > dataPompier.length)
            last_index = dataPompier.length
        
        output.push({
            "title": getPompText(dataPompier.slice(i, last_index)),
            "subtitle": `Page ${j}/${Math.ceil(dataPompier.length/10)}`
        })
    }
    return output;
}
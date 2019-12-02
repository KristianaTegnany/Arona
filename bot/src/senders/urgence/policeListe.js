import dataPolice from "../../../static/Urgence/dataPolice";

function getPolText(polices){
    let output = ""
    polices.forEach(function(police){
        output = output + "-" + police.nom.charAt(0).toUpperCase() + police.nom.slice(1).toLowerCase() + ": \n" + police.contacts[0] + "\n\n"
    })
    return output
}

export default function() {
    let output = []
    let j = 0
    for (let i = 0; i < dataPolice.length; i = i + 2) {
        j = j + 1
        let last_index = i + 2
        if(last_index > dataPolice.length)
            last_index = dataPolice.length
        
        output.push({
            "title": getPolText(dataPolice.slice(i, last_index)),
            "subtitle": `Page ${j}/${Math.ceil(dataPolice.length/2)}`
        })
    }
    return output;
}
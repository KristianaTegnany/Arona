import express from 'express'
import localtunnel from 'localtunnel'
import 'dotenv/config';


const app = express()
export default function(){
    return localtunnel(app.get('port'),{
        subdomain : process.env.subdomain
    }, function(err, tunnel) {
        if (err) console.log("erreur !")
        else console.log(`your tunnel url is: ${tunnel.url}`)
    });
}


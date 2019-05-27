import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import webhook from "./routes/webhook";
import index from "./routes/";
import session from "express-session";
import app from "./app.js";
import "./scripts/tempFolders";
const server = require("http").Server(app);

// Database connection
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.static("./temp/archives"));
app.use(express.static("./temp/merge"));
app.use("/youtube", express.static("./temp/youtube"));
app.use("/screenshoots", express.static("./temp/Screenshoots"));
app.use("/", express.static("./public"));
app.use("/main_menu", express.static("./static/main_menu"));

//Routes initalisation
app.use("/webhook", webhook);
app.use("/", index);

app.set("port", process.env.PORT || 8000);

server.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

if (process.env.NODE_ENV == "dev ") {
  const localtunnel = require("localtunnel");
  var tunnel = localtunnel(
    app.get("port"),
    {
      subdomain: process.env.subdomain
    },
    function(err, tunnel) {
      if (err) console.log("erreur !");
      else console.log(`your tunnel url is: ${tunnel.url}`);
    }
  );

  tunnel.on("close", function() {
    console.log("closed server ! Please ");
  });
}

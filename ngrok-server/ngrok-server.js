const ngrok = require("ngrok");
const open = require("open");
(async () => {
  const url = await ngrok.connect({
    addr: 8080, // port or network address, defaultst to 80
    authtoken: process.env.authtoken, // your authtoken from ngrok.com
    bind_tls: true
  });

  console.log(url);
})();

// Opens the image in the default image viewer
(async () => {
  // Specify app arguments
  await open(process.env.webhookUrl, {
    app: ["google chrome", "firefox"]
  });
})();

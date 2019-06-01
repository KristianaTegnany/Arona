const ngrok = require("ngrok");
(async () => {
  const url = await ngrok.connect({
    addr: process.env.port, // port or network address, defaultst to 80
    authtoken: process.env.authtoken, // your authtoken from ngrok.com
    bind_tls: true
  });

  console.log(url);
  console.log(process.env.webhookUrl)
})();

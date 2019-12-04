import fs from "fs";
import rimraf from "rimraf";
if (fs.existsSync("./temp")) {
  rimraf("./temp", function() {
    createTempFolders();
  });
} else {
  createTempFolders();
}

function createTempFolders() {
  fs.mkdir("./temp", function() {
    fs.mkdirSync("./temp/Apk");
    fs.mkdirSync("./temp/ArchivedPages");
    fs.mkdirSync("./temp/Bus");
    fs.mkdirSync("./temp/Lyrics");
    fs.mkdirSync("./temp/SavedPages");
    fs.mkdirSync("./temp/Screenshoots");
    fs.mkdir("./temp/Youtube", function() {
      fs.mkdirSync("./temp/Youtube/Videos");
      fs.mkdirSync("./temp/Youtube/Audios");
    });
  });
}

"use strict";

var fs = require('fs');

var path = require('path');

var request = require('request');

var _require = require('child_process'),
    execFile = _require.execFile;
/**
 * Updates or downloads the youtube-dl binary.
 * @return {Promise<String>} - New version number
 */


function updateBinary() {
  return new Promise(function (resolve, reject) {
    var bin = "youtube-dl".concat(process.platform === 'win32' ? '.exe' : '');
    var dest = path.join(__dirname, "ytdl", bin); // Get the latest version

    request.get("https://yt-dl.org/downloads/latest/".concat(bin)).on('error', function (e) {
      return reject(e);
    }) // Handle errors
    .on('end', function () {
      return setTimeout(function () {
        // Try to get the version number
        execFile(dest, ['--version'], function (error, stdout, stderr) {
          if (error || stderr.length) return reject(error || stderr);
          resolve(stdout);
        });
      }, 1000);
    }).pipe(fs.createWriteStream(dest, {
      mode: 493
    }));
  });
}

if (require.main === module) {
  // CLI
  console.log('Updating youtube-dl to the latest version...');
  updateBinary().then(function (version) {
    console.log("Successfully downloaded youtube-dl ".concat(version));
    process.exit();
  })["catch"](function (e) {
    console.error(e);
    process.exit(1);
  });
} else {
  // Module
  module.exports = updateBinary;
}
//# sourceMappingURL=updater.js.map
"use strict";

var fs = require('fs');

var write = require('write');

var flatted = require('flatted');

module.exports = {
  tryParse: function tryParse(filePath, defaultValue) {
    var result;

    try {
      result = this.readJSON(filePath);
    } catch (ex) {
      result = defaultValue;
    }

    return result;
  },

  /**
   * Read json file synchronously using flatted
   *
   * @method readJSON
   * @param  {String} filePath Json filepath
   * @returns {*} parse result
   */
  readJSON: function readJSON(filePath) {
    return flatted.parse(fs.readFileSync(filePath, {
      encoding: 'utf8'
    }));
  },

  /**
   * Write json file synchronously using circular-json
   *
   * @method writeJSON
   * @param  {String} filePath Json filepath
   * @param  {*} data Object to serialize
   */
  writeJSON: function writeJSON(filePath, data) {
    write.sync(filePath, flatted.stringify(data));
  }
};
//# sourceMappingURL=utils.js.map
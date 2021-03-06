"use strict";

var profile = {
  resourceTags: {
    ignore: function ignore(filename, mid) {
      // only include moment/moment
      return mid != "moment/moment";
    },
    amd: function amd(filename, mid) {
      return /\.js$/.test(filename);
    }
  }
};
//# sourceMappingURL=package.js.map
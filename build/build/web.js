"use strict";

exports = module.exports = function (query) {
  var hack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var rp = require('request-promise');

  var cheerio = require('cheerio');

  var urlencode = require('urlencode');

  query = query.trim() + ' ' + hack.trim();
  var url = 'http://www.bing.com/search?q=' + urlencode(query) + '&format=rss';
  var results = [];
  return rp(url).then(function (body) {
    $ = cheerio.load(body, {
      xmlMode: true
    });
    items = $('item');
    $(items).each(function (i, item) {
      result = {};
      result.title = $(item).find('title').text();
      result.link = $(item).find('link').text();
      result.description = $(item).find('description').text();
      result.pubdate = $(item).find('pubDate').text();
      results.push(result);
    });
    return results;
  });
};
//# sourceMappingURL=web.js.map
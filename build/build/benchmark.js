"use strict";

var bench = require('nanobench');

var extractDomainDist = require('./dist/extract-domain.min');

var extractDomain = require('./index');

var url = 'https://www.npmjs.com/package/extract-domain';
var times = 2500000;
var timesToLocale = times.toLocaleString();

function extractDomainArray(url) {
  var domain;

  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  return domain.split(':')[0].replace('www.', '');
}

function extractDomainRegEx(url) {
  var matches = url.match(/([^\/?#.]+\.[^\/?#.:]+)(?:[\/?#:]|$)/i);
  return matches[1];
}

bench("extract domain dist ".concat(timesToLocale, " times"), function (b) {
  b.start();

  for (var i = 0; i < times; i++) {
    extractDomainDist(url) === 'npmjs.com';
  }

  b.end();
});
bench("extract domain ".concat(timesToLocale, " times"), function (b) {
  b.start();

  for (var i = 0; i < times; i++) {
    extractDomain(url) === 'npmjs.com';
  }

  b.end();
});
bench("extract domain regex ".concat(timesToLocale, " times"), function (b) {
  b.start();

  for (var i = 0; i < times; i++) {
    extractDomainRegEx(url) === 'npmjs.com';
  }

  b.end();
});
bench("extract domain array hack ".concat(timesToLocale, " times"), function (b) {
  b.start();

  for (var i = 0; i < times; i++) {
    extractDomainArray(url) === 'npmjs.com';
  }

  b.end();
});
//# sourceMappingURL=benchmark.js.map
'use strict';

var fs = require('fs');

var path = require('path');
/* istanbul ignore next */


var LCHOWN = fs.lchown ? 'lchown' : 'chown';
/* istanbul ignore next */

var LCHOWNSYNC = fs.lchownSync ? 'lchownSync' : 'chownSync';
var needEISDIRHandled = fs.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/);
/* istanbul ignore next */

var handleEISDIR = needEISDIRHandled ? function (path, uid, gid, cb) {
  return function (er) {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR') cb(er);else fs.chown(path, uid, gid, cb);
  };
} : function (_, __, ___, cb) {
  return cb;
};
/* istanbul ignore next */

var handleEISDirSync = needEISDIRHandled ? function (path, uid, gid) {
  try {
    return fs[LCHOWNSYNC](path, uid, gid);
  } catch (er) {
    if (er.code !== 'EISDIR') throw er;
    fs.chownSync(path, uid, gid);
  }
} : function (path, uid, gid) {
  return fs[LCHOWNSYNC](path, uid, gid);
}; // fs.readdir could only accept an options object as of node v6

var nodeVersion = process.version;

var readdir = function readdir(path, options, cb) {
  return fs.readdir(path, options, cb);
};

var readdirSync = function readdirSync(path, options) {
  return fs.readdirSync(path, options);
};
/* istanbul ignore next */


if (/^v4\./.test(nodeVersion)) readdir = function readdir(path, options, cb) {
  return fs.readdir(path, cb);
};

var chownrKid = function chownrKid(p, child, uid, gid, cb) {
  if (typeof child === 'string') return fs.lstat(path.resolve(p, child), function (er, stats) {
    if (er) return cb(er);
    stats.name = child;
    chownrKid(p, stats, uid, gid, cb);
  });

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, function (er) {
      if (er) return cb(er);
      var cpath = path.resolve(p, child.name);
      fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, cb));
    });
  } else {
    var cpath = path.resolve(p, child.name);
    fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, cb));
  }
};

var chownr = function chownr(p, uid, gid, cb) {
  readdir(p, {
    withFileTypes: true
  }, function (er, children) {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er && er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP') return cb(er);
    if (er || !children.length) return fs[LCHOWN](p, uid, gid, handleEISDIR(p, uid, gid, cb));
    var len = children.length;
    var errState = null;

    var then = function then(er) {
      if (errState) return;
      if (er) return cb(errState = er);
      if (--len === 0) return fs[LCHOWN](p, uid, gid, handleEISDIR(p, uid, gid, cb));
    };

    children.forEach(function (child) {
      return chownrKid(p, child, uid, gid, then);
    });
  });
};

var chownrKidSync = function chownrKidSync(p, child, uid, gid) {
  if (typeof child === 'string') {
    var stats = fs.lstatSync(path.resolve(p, child));
    stats.name = child;
    child = stats;
  }

  if (child.isDirectory()) chownrSync(path.resolve(p, child.name), uid, gid);
  handleEISDirSync(path.resolve(p, child.name), uid, gid);
};

var chownrSync = function chownrSync(p, uid, gid) {
  var children;

  try {
    children = readdirSync(p, {
      withFileTypes: true
    });
  } catch (er) {
    if (er && er.code === 'ENOTDIR' && er.code !== 'ENOTSUP') return handleEISDirSync(p, uid, gid);
    throw er;
  }

  if (children.length) children.forEach(function (child) {
    return chownrKidSync(p, child, uid, gid);
  });
  return handleEISDirSync(p, uid, gid);
};

module.exports = chownr;
chownr.sync = chownrSync;
//# sourceMappingURL=chownr.js.map
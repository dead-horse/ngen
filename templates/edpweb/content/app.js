/*!
 * {{project}} - app.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

require('response-patch');
var fs = require('fs');
var ms = require('ms');
var http = require('http');
var path = require('path');
var taobaostatus = require('taobaostatus');
var connect = require('connect');
// var RedisStore = require('connect-mredis')(connect);
var urlrouter = require('urlrouter');
var render = require('connect-render');
var rt = require('connect-rt');
var cookieMiddleware = require('response-cookie');
var status = require('./status');
var logger = require('./common/logger');
var config = require('./config');
var routes = require('./routes');

var app = connect(
  rt(),
  function (req, res, next) {
    res.req = req;
    next();
  }
);

var STATIC_DIR = path.join(__dirname, 'public');
app.use('/public', connect.static(STATIC_DIR, { maxAge: 3600000 * 24 * 365 }));

app.use(taobaostatus({
  // /status.taobao
  statusFile: path.join(__dirname, 'public', 'status.taobao'),
  // /test/test.status
  checkAvailable: function (callback) {
    status.ready(function (err) {
      if (err) {
        console.log('checkAvailable() error: %s', err.stack);
        return callback(false);
      }
      callback(true);
    });
  }
}));

app.use(connect.query());
app.use(connect.bodyParser());
app.use(connect.cookieParser());
app.use(connect.session({
  key: config.sessionCookie,
  secret: config.sessionSecret,
  cookie: { path: '/', httpOnly: true, maxAge: ms('12h') },
  // store: new RedisStore(config.redisOptions)
}));

/**
 * res.cookie('name', 'value') helpers
 */
app.use(cookieMiddleware());

/**
 * Render
 */

var CDNMap = null;
var cdnfile = path.join(__dirname, 'cdn.json');
if (fs.existsSync(cdnfile)) {
  CDNMap = require(cdnfile);
  for (var k in CDNMap) {
    CDNMap[k] = CDNMap[k].url;
  }
}
var loader = require('loader');

var helpers = { 
  version: config.version,
  config: config,
  CDNMap: CDNMap,
  Loader: function () {
    return loader;
  },
  current_user: function (req, res) {
    return req.session && req.session.user;
  }
};

app.use(render({
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: '.html',
  cache: config.viewCache,
  helpers: helpers
}));

/**
 * URL routing
 */
app.use(urlrouter(routes));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  logger.error(err);
  if (config.mock) {
    return next(err);
  }
  res.statusCode = 500;
  res.send('服务器开小差了 (T_T)');
});

var server = http.createServer(app);
server.__listen = server.listen;
server.listen = function (port, callback) {
  status.ready(function () {
    server.__listen(port, callback);
  });
  return this;
};


module.exports = server;

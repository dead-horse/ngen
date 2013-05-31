/*!
 * {{project}} - worker.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var graceful = require('graceful');
var logger = require('./common/logger');
var config = require('./config');
var server = require('./app');

server.listen(config.port);

graceful({
  server: [server],
  error: function (err, throwErrorCount) {
    if (err.message) {
      err.message += ' (uncaughtException throw ' + throwErrorCount + ' times on pid:' + process.pid + ')';
    }
    logger.error(err);
  }
});

/*!
 * {{project}} - common/logger.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var logger = require('ali-logger');
var config = require('../config');
var ms = require('ms');
var ONE_DAY = ms('1d');

logger.init({
  logdir: config.logdir,
  duration: ONE_DAY,
  stderr: config.logStdErr,
  accessLog: true,
});


module.exports = logger;

/*!
 * {{project}} - status.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('./config');

exports.ready = function (callback) {
  if (exports._ready) {
    return callback();
  }

  exports._ready = true;
  callback();
};
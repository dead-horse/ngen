/*!
 * {{project}} - controllers/home.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

module.exports = function (req, res, next) {
  res.render('/index', {
    now: new Date()
  });
};

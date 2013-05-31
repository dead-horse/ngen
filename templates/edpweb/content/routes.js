/*!
 * {{project}} - routes.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var config = require('./config');
var home = require('./controllers/home');

module.exports = function (app) {

  app.get('/', home);

  if (config.mockLastdate) {
    app.get('/__throwerrortest', function (req, res) {
      var err = new Error('mock throw Error');
      err.code = 'MOCK';
      err.data = { msg: '测试异常' };
      throw err;
    });

    app.get('/__throw_async_errortest', function (req, res) {
      setTimeout(function () {
        asyncError();
      }, 10);
    });

    app.get('/__test_exit', function (req, res) {
      process.exit(1);
    });
  }
};

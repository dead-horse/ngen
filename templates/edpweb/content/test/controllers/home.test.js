/*!
 * {{project}} - test/controllers/home.test.js 
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var app = require('../../app');
var request = require('supertest');

describe('controllers/home.test.js', function () {
  
  before(function (done) {
    app.listen(0, done);
  });

  it('should GET / success', function (done) {
    request(app)
    .get('/')
    .expect(/hello world/)
    .expect(200, done);
  });

});

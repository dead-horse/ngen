/*!
 * {{project}} - dispatch.js dispatch app workers.
 * Copyright(c) {{copyrightyear}} Alibaba Group Holding Limited.
 * Author: {{name}} <{{email}}>
 */

"use strict";

/**
 * Module dependencies.
 */

var path = require('path');
var util = require('util');
var fs = require('fs');
var config = require('./config');

if (config.enableCluster) {
  var workerpath = path.join(__dirname, 'worker.js');
  var cluster = require("cluster");
  var restartTime = 5000;

  cluster.setupMaster({
    exec: workerpath
  });

  cluster.on('fork', function (worker) {
    console.log('[%s] [worker:%d] new worker start', new Date(), worker.process.pid);
  });

  cluster.on('disconnect', function (worker) {
    var w = cluster.fork();
    console.error('[%s] [master:%s] wroker:%s disconnect! new worker:%s fork', 
      new Date(), process.pid, worker.process.pid, w.process.pid);
  });

  cluster.on('exit', function (worker, code, signal) {
    var exitCode = worker.process.exitCode;
    var err = new Error(util.format('worker %s died (code: %s, signal: %s)', worker.process.pid, exitCode, signal));
    err.name = 'WorkerDiedError';
    // TODO: logger
    // logger.error(err);
    console.error(err);
    // TODO: 需要增加短信通知
    // mailer.sendWarning('[魔方情报] 子进程异常重启了!', err.message, function (err) {
    //   if (err) {
    //     logger.error(err);
    //   }
    // });
  });

  var numCPUs = require('os').cpus().length;
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

} else {
  require('./worker');
}

console.log('[%s] [master:%d] Server started, listen at %d, cluster: %s',
  new Date(), process.pid, config.port, config.enableCluster);

/*!
 * {{project}} - lib/{{project}}.js 
 * Copyright(c) {{copyrightyear}} {{name}} <{{email}}>
 */


/**
 * Module dependencies.
 */


module.exports = process.env.{{projectUpperCase}}_COV ? require('./lib-cov/{{project}}') : require('./lib/{{project}}');

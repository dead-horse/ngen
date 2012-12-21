module.exports = process.env.{{projectUpperCase}}_COV ? require('./lib-cov/{{project}}') : require('./lib/{{project}}');

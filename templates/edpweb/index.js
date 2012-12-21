var fs = require('fs');
exports.variables = {
    project: 'Project name: '
  , name: 'Enter your name: '
  , email: 'Enter your email: '
  , description: 'Project description: '
};

fs.mkdir(__dirname + '/content/controllers');
fs.mkdir(__dirname + '/content/common');
fs.mkdir(__dirname + '/content/proxy');
fs.mkdir(__dirname + '/content/public');
fs.mkdir(__dirname + '/content/views');
fs.mkdir(__dirname + '/content/lib');
fs.mkdir(__dirname + '/content/test/controllers');
fs.mkdir(__dirname + '/content/test/common');
fs.mkdir(__dirname + '/content/test/proxy');
fs.mkdir(__dirname + '/content/test/lib');
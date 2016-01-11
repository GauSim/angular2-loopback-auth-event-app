var bunyan = require('bunyan');
exports.Logger = bunyan.createLogger({
    name: 'Server',
    level: 'DEBUG'
});
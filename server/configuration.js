"use strict";

module.exports.apiPrefix = '/reach';
module.exports.port = process.env.PORT || 3000;
module.exports.defaultTimeout = process.env.DEFAULT_TIMEOUT || 5000;
module.exports.logType = process.env.LOG_TYPE || 'dev';
module.exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/reach';

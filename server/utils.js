
"user strict";

const url = require('url');

exports. handleError = (res, reason, message, code) => {
  console.log("ERROR: " + message + " Reason: " + reason);
  res.status(code || 500).json({"error": message});
};

exports.buildUrl = (req, path) => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: path
  });
};


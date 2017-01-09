
"user strict";

const url = require('url');

exports. handleError = (res, err, message, code) => {
  console.log("ERROR: " + message + " " +JSON.stringify(err));
  res.status(code || 500).json({"error": message});
};

exports.buildUrl = (req, path) => {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: path
  });
};


var path = require('path');
var _root = path.resolve(__dirname, '..');

exports.root = function (args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

exports.fromModules = function () {
  const pathArr = [].slice.call(arguments, 0);
  return path.resolve.apply(path, [_root].concat('node_modules', pathArr));
};

function padLeft(i) {
  return i < 10 ? `0${i}` : `${i}`;
}
exports.padLeft = padLeft;

exports.timestamp = function () {
  const d = new Date();
  return `${padLeft(d.getHours())}:${padLeft(d.getMinutes())}:${padLeft(d.getSeconds())}`;
};

exports.msToReadable = function (ms) {
  const seconds = ms / 1000;
  const levels = [
    [Math.floor(seconds / 31536000), 'y'],
    [Math.floor((seconds % 31536000) / 86400), 'd'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'h'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'm'],
    [((((seconds % 31536000) % 86400) % 3600) % 60).toFixed(2), 's'],
  ];
  return levels.filter(l => l[0] > 0).map(l => `${l[0]} ${l[1]}`).join(' ').trim();
};

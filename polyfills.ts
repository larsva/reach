require('core-js/es6');
//require('reflect-metadata');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
if (process.env.ENV === 'prod') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
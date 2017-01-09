'use strict';
const assert = require('assert');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
require('core-js/modules/es7.object.values');

const configCommon = require('./config/webpack.common');
const configDev = require('./config/webpack.dev');
const configProd = require('./config/webpack.prod');

const ENV = {
  prod: process.env.ENV && process.env.ENV === 'prod',
  dev: !process.env.ENV || process.env.ENV !== 'prod'
};

console.log('ENV: ' + JSON.stringify(ENV));

assert.ok(Object.values(ENV).filter(v => v).length === 1, 'En byggmiljö vald');

switch (true) {
  case ENV.dev:
    module.exports = webpackMerge(configCommon(false), configDev);
    break;

  case ENV.prod:
    module.exports = webpackMerge(configCommon(true), configProd);
    break;
}
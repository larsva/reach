var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

exports = module.exports = function makeWebpackCommon(useChecksum) {
  const config = {
    entry: {
      'polyfills': './polyfills.ts',
      'vendor': './vendor.ts',
      'app': './client/main.ts'
    },

    resolve: {
      root: [helpers.root(), helpers.root('client')],
      extensions: ['', '.js', '.ts'],
      modulesDirectories: ['node_modules']
    },

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.fromModules('rxjs'),
            helpers.fromModules('@angular'),
            helpers.fromModules('angular2-google-maps')
          ]
        }
      
      ],
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/, helpers.fromModules()]
        },
        {
          test: /\.html$/,
          include: [helpers.root('client')],
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('client'),
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        },
        {
          test: /\.css$/,
          include: helpers.root('client'),
          loader: 'raw'
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ],
  }

  return config;
};

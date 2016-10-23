


var config = require('./webpack.config.js'),
  webpack = require('webpack');

config.output.filename = './bundle.min.js',

config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

config.debug = false;
config.devtool = 'none';

module.exports = config;
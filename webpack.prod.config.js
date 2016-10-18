


  var config = require('./webpack.config.js'),
    webpack = require('webpack');

config.output.filename = './dist/bundle.min.js',

//config.plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js'));
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin());
config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());

module.exports = config;
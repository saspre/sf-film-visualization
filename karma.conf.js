var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'src/**/*-test.ts' //just load this file
        ],
        preprocessors: {
            'src/**/*.ts': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },
    
    });
};

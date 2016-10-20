var webpack = require('webpack');
module.exports = {  
  entry: ['babel-polyfill','whatwg-fetch','./src/app.ts'],
  output: {
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.json']
  },
  
 
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'babel-loader!ts-loader',
        exclude: '/node_modules',
       
      },
       {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }, 
      { 
        test: /\.json$/, 
        loader: "json"
      }
    ]
  },
  plugins: [
       new webpack.ProvidePlugin({
        //    Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
           'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch' }) 
   ],
  debug: true,
  node: {
    fs: "empty",
    net: 'empty',
    module: "empty"
  }
}


//  new webpack.optimize.CommonsChunkPlugin('common.js'),
  // new webpack.optimize.DedupePlugin(),
  // new webpack.optimize.UglifyJsPlugin(),
  // new webpack.optimize.AggressiveMergingPlugin()
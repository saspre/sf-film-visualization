var webpack = require('webpack');
module.exports = {  
  entry: ['whatwg-fetch','./src/app.ts'],
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
        loader: 'ts-loader', //babel-loader!
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
  debug: true
}


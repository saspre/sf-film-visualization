
module.exports = {  
  entry: './src/app.ts',
  output: {
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  
 
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: 'ts-loader' 
      },
       {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
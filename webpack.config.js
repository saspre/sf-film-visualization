var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var glob = require('glob');

module.exports = {  
  entry: ['whatwg-fetch','./src/app.ts'],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.json', '.handlebars']
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
        loader: "style-loader!css-loader!postcss-loader!sass-loader"
      }, 
      { 
        test: /\.json$/, 
        loader: "json"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
       },
       	{
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
				query: {
					partialDirs: [path.resolve(__dirname, 'src', 'components')].concat(glob.sync('**/', { cwd: path.resolve(__dirname, 'src', 'components'), realpath: true }))
				}
			},
    ]
  },
  sassLoader: {
		includePaths: [
			'./src/styles',
			'./src/components/**/*.scss'
		]
	},
  plugins: [
		new CleanWebpackPlugin(['dist'], { verbose: true }),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    }),
  	new CopyWebpackPlugin([{ from: './src/static', ignore: 'fonts' }]),
    new HtmlWebpackPlugin({
      title: 'Main',
      filename: 'index.html',
      template: './src/main.handlebars',
      chunks: ['main']
    }),
  ],
  debug: true
}


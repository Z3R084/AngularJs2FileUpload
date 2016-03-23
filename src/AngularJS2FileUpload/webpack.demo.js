var webpack = require( 'webpack' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: {
		'app': './demo/src/demo.ts'
	},
	output: {
		path: __dirname + '/demo/dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.ts/,
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		//new webpack.optimize.CommonsChunkPlugin( /* chunkNamej=*/"vendor", /* filename=*/"./vendor.bundle.js" ),
		new HtmlWebpackPlugin( {
			template: './demo/index.html',
			inject: 'body'
		} )
	],
	devServer: {
		contentBase: './demo/dist',
		stats: {
			modules: false,
			cached: false,
			colors: true,
			chunk: false
		}
	}
};
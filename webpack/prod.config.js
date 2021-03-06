const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'production',
	entry: {
		tabapp: [path.join(__dirname, '../chrome/extension/tabapp.js')],
		// window: [path.join(__dirname, '../chrome/extension/window')],
		// popup: [path.join(__dirname, '../chrome/extension/popup')],
		background: [path.join(__dirname, '../chrome/extension/background')]

		// content: [path.join(__dirname, '../chrome/extension/content')],
		// page: [path.join(__dirname, '../chrome/extension/page')]
	},
	output: {
		path: path.join(__dirname, '../build/js'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(false),
		new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	resolve: {
		extensions: ['*', '.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react-optimize']
				}
			},
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				plugins: () => [autoprefixer]
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	test: /\.scss$/,
			// 	use: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader']
			// },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader' // translates CSS into CommonJS modules
						},
						{
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins() {
									// post css plugins, can be exported to postcss.config.js
									return [autoprefixer];
								}
							}
						},
						{
							loader: 'sass-loader' // compiles SASS to CSS
						}
					]
				})
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'url-loader'
					}
				]
			}
		]
	}
};

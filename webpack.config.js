'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var srcDir = path.resolve(__dirname, 'src-front');

let config = {
	entry: path.join(srcDir, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Sentiment Analysis',
			template: path.join(srcDir, 'template.html')
		})
	],
	module: {
		loaders: [
			{
				test: /\.js?/,
				include: srcDir,
				loader: 'babel-loader'
			}
		]
	}
};

module.exports = config;


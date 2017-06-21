'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEBUG = !process.argv.includes('--release');
module.exports = {
  entry: {
    app: './app/app.module.js',
    vendor: [
      'angular',
      'angular-ui-router'
    ]
  },
  output: {
    path: './build',
    filename: DEBUG ? '[name].js' : '[name].[hash].js',
    chunkFilename: DEBUG ? '[id].chunk.js' : '[id].[hash].chunk.js'
  },
  module: {
    loaders: [{
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader!sass-loader'])
    },
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      query: {
        name: '[name].[hash].[ext]',
        limit: 10000
      }
    },
    {
      test: /\.(wav|mp3|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      query: {
        name: '[name].[hash].[ext]'
      }
    },
    {
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel-loader']
    },
  ]
},
devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
plugins: (function(plugins){
  plugins.push(new HtmlWebpackPlugin({
    title: "Angular-directives",
    template: 'app/index.html'
  }));
  plugins.push(new ExtractTextPlugin('[name].[hash].css', { disable: DEBUG }));
  if (!DEBUG) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
  return plugins;
})([])};
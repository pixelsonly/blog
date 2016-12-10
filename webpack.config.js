var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var CSSNext = require('postcss-cssnext');

module.exports = {

  entry: {
    app: [
      './source/assets/javascripts/app.js',
      './source/assets/stylesheets/app.css.scss'
    ]
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'assets/javascripts/[name].bundle.js'
  },

  module: {
    loaders: [
      // JS
      {
        test: /source\/assets\/javascripts\/.*\.js$/,
        exclude: /(node_modules|\.tmp|build)/,
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react']}
      },

      // SCSS
      {
        test: /.*\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!postcss!sass?sourceMap'
        )
      },
    ],
  },

  devtool: 'source-map',

  sassLoader: {
    includePaths: [__dirname + '/node_modules']
  },

  postcss: [CSSNext],

  resolve: {
    root: __dirname + 'assets/javascripts',
    extensions: ['', '.js', '.json', '.jsx']
  },

  plugins: [
    new CleanWebpackPlugin(['.tmp']),
    new ExtractTextPlugin('assets/stylesheets/app.bundle.css', {allChunks: true}),
    new StyleLintPlugin({
      configFile: '.stylelintrc.json',
      syntax: 'scss'
    }),

    // Make React globally available
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    })
  ],
};

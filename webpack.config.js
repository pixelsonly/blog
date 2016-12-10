var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
          'css!sass?sourceMap'
        )
      },
    ],
  },

  devtool: 'source-map',

  sassLoader: {
    includePaths: [__dirname + '/node_modules']
  },

  resolve: {
    root: __dirname + 'assets/javascripts',
    extensions: ['', '.js', '.json', '.jsx']
  },

  plugins: [
    new CleanWebpackPlugin(['.tmp']),

    // CSS output
    new ExtractTextPlugin('assets/stylesheets/app.bundle.css', {allChunks: true}),

    // Make React globally available
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    })
  ],
};

const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: devMode ? 'inline-sourcemap' : null,
  entry: './src/client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: devMode ? [
    new ExtractTextPlugin('style.min.css'),
  ] : [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'PROTOCOL', 'HOST', 'PORT']),
    new ExtractTextPlugin('style.min.css'),
    new webpack.optimize.DedupePlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'stage-3'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader']),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url',
      },
    ],
  },
};

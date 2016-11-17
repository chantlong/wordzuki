const webpack = require('webpack');

module.exports = {
  devtool: 'inline-sourcemap',
  entry: './src/client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: [
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
        test: /\.(css)$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url',
      },
    ],
  },
};

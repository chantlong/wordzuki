const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  devtool: devMode ? 'inline-sourcemap' : null,
  entry: './src/client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: devMode ? [] : [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'PROTOCOL', 'HOST', 'PORT']),
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
        test: /\.(css|scss)$/,
        loader: 'style!css',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url',
      },
    ],
  },
};

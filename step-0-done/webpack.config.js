var webpack = require('webpack');
var path = require('path');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./app/bootstrap.js']
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "app"),
          loader: "eslint-loader"
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};

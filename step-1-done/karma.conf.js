var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'chai'],

    files: ['webpack.karma.context.js'],

    preprocessors: {
      'webpack.karma.context.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
        ]
      },
      watch: true
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  })
}

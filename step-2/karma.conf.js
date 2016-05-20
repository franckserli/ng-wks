var webpackConf = require('./webpack.config');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'chai'],

    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './webpack.karma.context.js',
    ],

    preprocessors: {
      'webpack.karma.context.js': ['webpack'],
    },

    webpack: webpackConf,

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

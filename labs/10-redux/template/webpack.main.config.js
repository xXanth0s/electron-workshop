const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  devtool: 'eval',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'extensions',
          to: 'extensions',
        }
      ],
    }),
  ],
};
const { join } = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    landing: './lib/landing/index.js',
    webchat: './lib/webchat/index.js'
  },
  mode: 'development',
  output: {
    path: join(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }]
    }),
    new ProvidePlugin({ process: ['process'] })
  ],
  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util')
    }
  }
};

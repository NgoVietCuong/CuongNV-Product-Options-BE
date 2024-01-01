const path = require('path');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  entry: './browser/index.js',
  output: {
    filename: 'hoa-po-js.js',
    path: path.resolve(__dirname, 'public')
  }
}
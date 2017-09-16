module.exports = {
  'context': __dirname + '/src',
  'entry': './index.js',
  'output': {
    'path': __dirname + '/dist',
    'filename': 'squint.min.js',
    'library': 'squint',
    'libraryTarget': 'umd'
  },
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'babel-loader'
    }]
  }
};

const path = require('path'),
      CopyPlugin =  require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  watch: true,

  entry: {
    main: path.join(__dirname, 'src', 'js', 'main.js'),
    background: path.join(__dirname, 'src', 'js', 'background.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  plugins: [
      new CopyPlugin([
        {from: path.join(__dirname, 'src', 'static')}
      ]),
  ],
  devtool: 'inline-source-map',
};
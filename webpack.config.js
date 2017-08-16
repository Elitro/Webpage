var path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./main.js', './styles.scss']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [

      // your other rules for JavaScript transpiling go in here

      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    // new webpack.optimize.UglifyJsPlugin()
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  }
};

// module.exports = {
//   context: path.resolve(__dirname, './src'),
//   entry: {
//     app: ['./main.js']
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].bundle.js',
//   },
//   module: {
//     rules: [
//     ]
//   },
//   plugins: [
//   ]
// };
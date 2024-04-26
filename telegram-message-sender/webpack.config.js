const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'index.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~shared': path.resolve('src/shared'),
      '~utils': path.resolve('src/utils'),
      '~store': path.resolve('src/store'),
      '~components': path.resolve('src/components'),
      '~constants': path.resolve('src/constants'),
      '~routes': path.resolve('src/routes'),
      '~api': path.resolve('src/api'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Serve files from this directory
    port: 3000, // Port for the development server
    open: true, // Open the default web browser when the server starts
  },
};

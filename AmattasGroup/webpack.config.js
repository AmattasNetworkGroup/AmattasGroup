const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/AmattasGroup.js',  // Entry point for your main JavaScript file
  output: {
    filename: 'main.js', // Using content hash for better caching
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean dist folder before each build
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Splitting all code into separate chunks
    },
    minimize: true, // Minimize the code for production
  },
  mode: 'production', // Set mode to production for optimizations
  module: {
    rules: [
      {
        test: /\.css$/i, // To handle CSS files
        use: ['style-loader', 'css-loader'], // Loads and injects CSS into the DOM
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Path to your HTML template
      filename: 'index.html',  // Output HTML file name in dist folder
    }),
    new HtmlWebpackPlugin({
      template: './src/real-estate-welcome.html',  // Path to another HTML file
      filename: 'real-estate-welcome.html',  // Output HTML file name in dist folder
    }),
    new HtmlWebpackPlugin({
      template: './src/telecommunications.html',  // Path to another HTML file
      filename: 'telecommunications.html',  // Output HTML file name in dist folder
    }),
    new HtmlWebpackPlugin({
      template: './src/solar.html',  // Path to another HTML file
      filename: 'solar.html',  // Output HTML file name in dist folder
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/AmattaStyles.css', to: 'AmattaStyles.css' },
        { from: 'src/realestate.css', to: 'realestate.css' },
        { from: 'src/telecom.css', to: 'telecom.css' },
        { from: 'src/solar.css', to: 'solar.css' },
        { from: 'src/realestate.js', to: 'realestate.js' },
        { from: 'src/telecom.js', to: 'telecom.js' },
        { from: 'src/solar.js', to: 'solar.js' },
        { from: 'src/timer.vs1.js', to: 'timer.vs1.js' },
        { from: 'src/AmattasGroup.js', to: 'AmattasGroup.js' },
        { from: 'src/android-chrome-192x192.png', to: 'android-chrome-192x192.png' },
        { from: 'src/android-chrome-512x512.png', to: 'android-chrome-512x512.png' },
        { from: 'src/manifest.json', to: 'manifest.json'},
        { from: 'src/favicon.ico', to: 'favicon.ico' },
        { from: 'src/service-worker.js', to: 'service-worker.js' },
        { from: 'src/apple-touch-icon.png', to: 'apple-touch-icon.png' },
        { from: 'src/favicon-16x16.png', to: 'favicon-16x16.png' },
        { from: 'src/favicon-32x32.png', to: 'favicon-32x32.png' },
      ],
    }),
  ],
};

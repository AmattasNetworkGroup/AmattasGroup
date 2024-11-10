const path = require('path');

module.exports = {
  entry: './src/AmattasGroup.js',  // Set the path to your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output files to the 'dist' directory
  },
  mode: 'production',  // Switch to 'development' for non-minified files
};

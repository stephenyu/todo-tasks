const path = require('path');
const ClosurePlugin = require('closure-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/web/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      inject: true,
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'web': path.resolve(process.cwd(), './src/web/'),
    }
  },
  optimization: {
    minimizer: [
      new ClosurePlugin({ mode: 'STANDARD' })
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

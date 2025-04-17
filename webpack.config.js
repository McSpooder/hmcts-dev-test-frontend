const path = require('path');

const sourcePath = path.resolve(__dirname, 'src/main/assets/js');
const govukFrontend = require(path.resolve(__dirname, 'webpack/govukFrontend'));
const scss = require(path.resolve(__dirname, 'webpack/scss'));
const HtmlWebpack = require(path.resolve(__dirname, 'webpack/htmlWebpack'));

const devMode = process.env.NODE_ENV !== 'production';
const fileNameSuffix = devMode ? '-dev' : '.[contenthash]';
const filename = `[name]${fileNameSuffix}.js`;

module.exports = {
  target: 'node',
  plugins: [...govukFrontend.plugins, ...scss.plugins, ...HtmlWebpack.plugins],
  entry: path.resolve(sourcePath, 'index.ts'),
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      ...scss.rules,
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'), // 👈 This is key
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'src/main/public/'),
    publicPath: '',
    filename,
  },
};

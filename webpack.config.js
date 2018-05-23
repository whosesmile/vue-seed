const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 不带版本 (整合工程到后端,后端提供版本识别;否则使用自带版本命名规则)
const SCRIPT_FORMAT = '[name].bundle.js';
const STYLES_FORMAT = '[name].bundle.css';

// 自带版本
const SCRIPT_CHUNK = '[name].[chunkhash].js';
const STYLES_CHUNK = '[name].[contenthash:20].css';

module.exports = function (env, args) {
  return {
    mode: 'development',
    entry: {
      app: './src/index.js',
    },
    output: {
      filename: SCRIPT_FORMAT,
      chunkFilename: SCRIPT_CHUNK,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.vue'],
      alias: {
        // TODO 查文档 仔细甄别
        'vue$': 'vue/dist/vue.common.js',
      },
    },

    plugins: [
      new CleanWebpackPlugin(['dist']), // 多版本共存模式时 必须要取消这个插件
      new HtmlWebpackPlugin({ title: 'STARTER', template: 'index.html' }),
      new webpack.ProvidePlugin({ axios: 'axios' }),
      new MiniCssExtractPlugin({
        filename: STYLES_FORMAT,
        chunkFilename: STYLES_CHUNK,
      }),
      new VueLoaderPlugin(),
    ],

    module: {
      rules: [{
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              minimize: true,
              sourceMap: true,
              localIdentName: '[hash:base64:8]',
            },
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          }, {
            loader: 'less-loader',
            options: { sourceMap: true },
          },
        ],
      }, {
        test: /\.(jpg|jpeg|gif|png)$/,
        use: ['file-loader'],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      }, {
        test: /\.vue$/,
        loader: ['vue-loader'],
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }, {
          loader: 'eslint-loader',
        }],
      }],
    },

    devtool: 'source-map',

    devServer: {
      contentBase: './dist',
      port: '3302',
      host: '0.0.0.0',
      disableHostCheck: true,
      historyApiFallback: true,
      proxy: {
        '/mock': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/mock': '' },
        }
      }
    },

  };

};

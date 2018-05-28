// Generate schema.js
require('./schema.config');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ChunkRenamePlugin = require('webpack-chunk-rename-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 不带版本 (整合工程到后端,后端提供版本识别;否则使用自带版本命名规则)
const SCRIPT_FORMAT = '[name].[chunkhash].js';
const STYLES_FORMAT = '[name].[contenthash:20].css';

// 自带版本
const SCRIPT_CHUNK = '[name].[chunkhash].js';
const STYLES_CHUNK = '[name].[contenthash:20].css';

module.exports = function (env, args) {
  return {
    mode: 'development',
    devtool: 'source-map',
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
        // TODO 需查文档 仔细甄别
        'vue$': 'vue/dist/vue.common.js',
      },
    },

    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors',
          }
        }
      },
    },

    plugins: [
      new CleanWebpackPlugin(['dist']), // 多版本共存模式时 必须要取消这个插件
      new HtmlWebpackPlugin({ title: 'VUE-SEED', template: 'index.html' }),
      new webpack.ProvidePlugin({ axios: 'axios' }),
      new webpack.DefinePlugin({ 'process.env.DEBUG_ENV': JSON.stringify(env) }), // 模拟接口
      new MiniCssExtractPlugin({
        filename: STYLES_FORMAT,
        chunkFilename: STYLES_CHUNK,
      }),
      new VueLoaderPlugin(),
      // optimization会导致output.filename失效 所以使用此插件
      // https://github.com/webpack/webpack/issues/6598
      new ChunkRenamePlugin({
        app: SCRIPT_FORMAT,
        vendors: SCRIPT_FORMAT,
        manifest: SCRIPT_FORMAT,
      }),
      // 以下两个无论开发还是生产都启用 以便充分利用缓存
      new webpack.NamedChunksPlugin(),
      new webpack.HashedModuleIdsPlugin({ hashDigestLength: 8 }),
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
        test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|otf)$/,
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

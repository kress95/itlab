const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

const clientPlugins = [
  new HtmlWebpackPlugin({
    hash: true,
    title: 'Painel de Controle',
    template: 'index.html',
    filename: 'index.html',
  }),
]

if (isProd) {
  clientPlugins.push(new MinifyPlugin())
}

const src = path.resolve(__dirname, 'src')

const babelLoader = {
  test: /\.ts$/,
  use: ['babel-loader', 'ts-loader'],
  include: src,
}

const performance = {hints: false}
const mode = isProd ? 'production' : 'development'
const resolve = {extensions: ['.ts', '.js']}

module.exports = [
  {
    entry: path.resolve(src, 'client.ts'),
    module: {rules: [babelLoader]},
    target: isTest ? 'node' : 'web',
    externals: isTest ? [nodeExternals()] : [],
    plugins: clientPlugins,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', "public"),
    },
    performance,
    mode,
    resolve,
  },
  {
    entry: path.resolve(src, 'server.ts'),
    module: {rules: [babelLoader]},
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    performance,
    mode,
    resolve,
  }
]

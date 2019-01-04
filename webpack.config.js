const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

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
const models = path.resolve(__dirname, 'models')

const performance = {hints: false}
const mode = isProd ? 'production' : 'development'
const resolve = {
  extensions: ['.ts', '.js'],
  plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
}

module.exports = [
  {
    entry: path.resolve(src, 'client', 'index.ts'),
    module: {
      rules: [
        {
          test: /\.{ts,js}$/,
          use: ['babel-loader', 'ts-loader'],
          include: [src],
        },
      ],
    },
    target: isTest ? 'node' : 'web',
    externals: isTest ? [nodeExternals()] : [],
    plugins: clientPlugins,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist', 'public'),
    },
    performance,
    mode,
    resolve,
  },
  {
    entry: path.resolve(src, 'server', 'index.ts'),
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['babel-loader', 'ts-loader'],
          include: [src, models],
        },
      ],
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    performance,
    mode,
    resolve,
  },
]

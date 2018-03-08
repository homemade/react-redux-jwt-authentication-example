var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2016', 'stage-3']
                }
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      // Env vars
      new webpack.DefinePlugin({
        'process.env':{
          'ORGANISATION_UUID': process.env.ORGANISATION_UUID,
          'CAMPAIGN_UUID': process.env.CAMPAIGN_UUID
        }
      })
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
    }
}

/**
 * @file ./config/webpack.config.js
 * @author CharlesYu01
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    entry: ['./example/index.ts'],
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: '../dist',
        port: 9000
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'vue typescript 示例',
        template: './example/index.html',
        filename: './index.html',
        showErrors: true,
        chunks: ['main']}),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.(vue)$/, use: {loader: 'vue-loader'}}
        ]
    }
};

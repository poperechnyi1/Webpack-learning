const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output:{
        filename: 'main.js',
        path: path.resolve( __dirname, 'dist')
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            // chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin({}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery':'jquery'
        })
    ],

    module:{
        rules:[
            {
                // test: /\.css$/,
                // use: [
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //         // options: {
                //         //     // you can specify a publicPath here
                //         //     // by default it uses publicPath in webpackOptions.output
                //         //     publicPath: '../',
                //         //     hmr: process.env.NODE_ENV === 'development',
                //         // },
                //     },
                //     'css-loader',
                // ],

                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ],

            },
        ]
    }
}
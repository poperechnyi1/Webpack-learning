const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output:{
        filename: 'main.js',
        path: path.resolve( __dirname, 'dist')
    },
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
    ],

    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     // you can specify a publicPath here
                        //     // by default it uses publicPath in webpackOptions.output
                        //     publicPath: '../',
                        //     hmr: process.env.NODE_ENV === 'development',
                        // },
                    },
                    'css-loader',
                ],
            },
        ]
    }
}
'use stricts';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // mode: 'development',
    entry: './home',
    output: {
        filename: 'build.js',
        library: "home"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : 'null',

    plugins: [
        new webpack.DefinePlugin({NODE_ENV:JSON.stringify(NODE_ENV),
        LANG: JSON.stringify('ru')})
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['*','.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['*','.js']
    },

    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader?optional[]=runtime',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },

};

if(NODE_ENV == 'production'){
    module.exports.optimization={
        minimizer:[new UglifyJsPlugin()]
    }
}
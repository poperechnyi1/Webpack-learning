'use stricts';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    // mode: 'development',
    context: __dirname + '/src',
    entry: {
        app: "./js/app",
    },
    output: {
        filename: '[name].js',
        publicPath: "/dist/",
        library: "[name]"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : 'null',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
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
        minimizer:[new UglifyJsPlugin({
            uglifyOptions: {
                compress: {},
                warnings: false,
                drop_console: true,
                unsafe: true
            }

        })]
    }
}
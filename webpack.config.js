'use stricts';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    // mode: 'development',
    context: __dirname + '/src',
    entry: {
        home: "./js/home",
        about: "./js/about",
        welcome: "./js/welcome",
        common: ["./js/common", "./js/welcome"]
    },
    output: {
        filename: '[name].js',
        library: "[name]"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : 'null',

    plugins: [
        new webpack.DefinePlugin({NODE_ENV:JSON.stringify(NODE_ENV),
        LANG: JSON.stringify('ru')}),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.optimize.splitChunks({
        //     name: "common"
        // })
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

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }

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
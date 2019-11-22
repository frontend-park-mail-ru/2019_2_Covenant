const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path:  __dirname +'/public/build',
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpeg|jpg|ttf)$/,
                use: [
                    { loader: 'url-loader', options: { limit: 8192 } }
                    // limit => file.size =< 8192 bytes ? DataURI : File
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                use: 'pug-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
};

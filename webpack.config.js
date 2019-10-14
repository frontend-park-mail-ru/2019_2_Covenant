const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path:  __dirname +'/public/build',
    },
    module: {
        rules: [
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
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
};

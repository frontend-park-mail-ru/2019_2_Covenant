const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');


module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
                use: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
        ],
    },   
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        plugins: [
            new TsConfigPathsPlugin(),
        ],
        alias: {
            'audioplayer': path.resolve(__dirname, 'audio-system/audioplayer'),
            'data-structure': path.resolve(__dirname, 'audio-system/data-structure'),
        }
    },    
}
const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');


module.exports = {
    mode: 'development',
    entry: './index.ts',
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
        ]
    },    
}
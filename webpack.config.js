const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './public/index.js',
    output: {
        filename: 'bundle.js',
        path:  __dirname +'/build',
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new CopyPlugin([
            { from: 'public/img', to: 'img' },
        ]),
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
        extensions: [ '.js' ]
    },
};

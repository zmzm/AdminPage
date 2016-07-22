var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './react-client/js/index.js'
    ],
    output: {
        devtool: 'cheap-module-source-map',
        path: './react-client/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                plugins: ['transform-runtime'],
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
var path = require('path');

module.exports = {
    entry: [
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
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
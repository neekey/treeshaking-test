var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var srcPath = path.resolve(__dirname, 'src');

var webpackConfig = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        index2: path.join(srcPath, 'index2.js'),
    },
    output: {
        path: buildPath,
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'es2016'],
                },
            },
        ],
    },
};

module.exports = webpackConfig;
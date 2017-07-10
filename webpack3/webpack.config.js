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
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 presets: [['es2015', { modules: false }]],
            //             },
            //         },
            //     ],
            // },
        ],
    },
};

module.exports = webpackConfig;
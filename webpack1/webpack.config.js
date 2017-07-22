var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var srcPath = path.resolve(__dirname, 'src');
var webpack = require('webpack');

var webpackConfig = {
    entry: {
        lodashImportAllTest: path.join(srcPath, 'lodash-import-all-test.js'),
        lodashNamedImportTest: path.join(srcPath, 'lodash-named-import-test.js'),
        lodashSingleModuleImportTest: path.join(srcPath, 'lodash-single-module-import-test.js'),
        particalImportTest: path.join(srcPath, 'partial-import-test.js'),
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
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
    ],
};

module.exports = webpackConfig;
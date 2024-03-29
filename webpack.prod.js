const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/index.ts',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2',
        },
    },
    resolve: {
        alias: {
            '@env': path.resolve(__dirname, 'src', 'env', 'prod'),
        },
    },
    module: {
        rules: [
            {
                test: path.resolve(__dirname, 'build', 'index.source.js'),
                type: 'asset/source',
            },
        ],
    },
});

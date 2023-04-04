const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/index-build.ts',
    output: {
        path: path.resolve('build'),
        filename: 'index.source.js',
        library: {
            name: 'domsi',
            type: 'var',
            export: 'default',
        },
    },
    resolve: {
        alias: {
            '@env': path.resolve(__dirname, 'src', 'env', 'web'),
        },
    },
    externals: {
        'color-rgba': 'null',
        'css-shorthand-expand': 'null',
    },
});
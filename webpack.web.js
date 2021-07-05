const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/index-web.ts',
    output: {
        path: path.resolve('dist.web'),
        filename: 'index.js',
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
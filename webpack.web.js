const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/index-web.ts',
    output: {
        path: path.resolve('web.dist'),
        filename: 'index.js',
        library: {
            name: 'domsi',
            type: 'var',
            export: 'default',
        },
    },
});
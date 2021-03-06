const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        library: {
            type: 'commonjs2',
        },
    },
});
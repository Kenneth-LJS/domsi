const path = require('path');
const glob = require('glob');
const exec = require('child_process').exec;
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './dev/src/index.ts',
    devtool: 'inline-source-map',
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve('build.dev'),
        filename: 'index.js',
        library: {
            type: 'module',
        },
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env'],
                                ['@babel/typescript'],
                            ],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@lib': path.resolve(__dirname, 'src'),
            '@env': path.resolve(__dirname, 'src', 'env', 'dev'),
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './dev/src/**/*.(html|png)',
                    to: path.resolve(__dirname, 'build.dev', '[name][ext]'),
                }
            ],
        }),
    ],
});
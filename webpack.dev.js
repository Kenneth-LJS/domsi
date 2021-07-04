const path = require('path');
const glob = require('glob');
const exec = require('child_process').exec;
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const entries = glob.sync('./src/**/*.[jt]s').reduce((entries, entry) => {
    const srcPath = path.resolve('src');
    const tempDestPath = path.join('domsi', path.relative(srcPath, entry));
    const parsed = path.parse(tempDestPath);
    const destPath = path.join(parsed.dir, parsed.name)
    entries[destPath] = entry;
    return entries;
}, {});

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
            // name: 'domsiDev',
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
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './dev/src/**/*.html',
                    to: path.resolve(__dirname, 'build.dev', '[name][ext]'),
                }
            ],
        }),
    ]
});
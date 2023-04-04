module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
        ],
    },
};

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ["", ".ts", ".js"],
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
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                ],
            },
        ],
    },
};
module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'prettier',
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    ignorePatterns: ['dist/**', 'web.dist/**'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        semi: ['error', 'always'],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
    },
};

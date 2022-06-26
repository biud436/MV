module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-undef': 'off',
        'no-use-before-define': 'off',
        'func-names': 'off',
        camelcase: 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'spaced-comment': 'off',
        'max-classes-per-file': 'off',
        strict: 'off',
    },
};

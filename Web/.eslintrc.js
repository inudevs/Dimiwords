module.exports = {
    root: true,
    extends: [
        'standard',
        'standard-jsx',
        'plugin:vue/essential'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    plugins: [
        'html',
        'standard',
        'vue'
    ],
    env: {
        browser: true
    },
    rules: {
    }
}

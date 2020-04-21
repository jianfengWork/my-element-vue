module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off', // 转义字符
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
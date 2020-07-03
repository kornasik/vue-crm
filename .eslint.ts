module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    "no-console": 1,
    "no-debugger": 1
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    '@typescript-eslint/no-explicit-any': 1
  }
}

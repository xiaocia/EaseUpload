module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/no-explicit-any': 1,
  },
}

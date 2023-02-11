module.exports = {
  plugins: ['redos-detector'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'redos-detector/no-unsafe-regex': 'error',
  },
};

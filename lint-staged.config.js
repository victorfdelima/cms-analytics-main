module.exports = {
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': filenames => `yarn lint ${filenames.join(' ')}`,
  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'yarn type-check',
};

/* ESLint config. package.json has run `eslint . --ext ts,tsx --max-warnings 0`
   since the project was created, but no config file ever existed, so the script
   failed outright and the zero-warning policy was never actually enforced. */
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'scripts/*.mjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      // react-refresh/only-export-components is about hot-reload ergonomics, not
      // correctness. These files co-locate a helper with a component on purpose:
      // shadcn ships its variant objects beside the component, a context file
      // exports its own hook, and Root.tsx exports the query-client factory that
      // both entry points share. Splitting them would be churn for no benefit.
      files: [
        'src/components/ui/**/*.tsx',
        'src/contexts/**/*.tsx',
        'src/Root.tsx',
      ],
      rules: { 'react-refresh/only-export-components': 'off' },
    },
  ],
}

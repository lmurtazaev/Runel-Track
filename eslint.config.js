import baseConfig from '@gravity-ui/eslint-config';
import importOrderConfig from '@gravity-ui/eslint-config/import-order';
import prettierConfig from '@gravity-ui/eslint-config/prettier';

export default [
  ...baseConfig, 
  ...prettierConfig, 
  ...importOrderConfig,
  {
    ignores: ['**/*.mjs', '**/*.cjs', '**/*.js', '**/*.d.ts', 'node_modules/', 'docs-build/', 'dist/', 'build/', 'docs/', 'marketplace/', 'public/', 'design/', '.git/', '*.min.js'],
  }
];

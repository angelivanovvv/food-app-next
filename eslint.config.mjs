import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'], // ✅ explicit
        tsconfigRootDir: import.meta.dirname, // ✅ stable in App Router repos
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      '@next/next': nextPlugin, // ✅ plugin key matches rule namespace
    },
    rules: {
      // ✅ Next core web vitals (includes @next/next/google-font-display, etc.)
      ...nextPlugin.configs['core-web-vitals'].rules,

      // Prettier
      'prettier/prettier': 'error',

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React / Next
      'react/react-in-jsx-scope': 'off',
    },
  },
  // ✅ MUST be last: disables any formatting rules that conflict with Prettier
  prettierConfig,
];

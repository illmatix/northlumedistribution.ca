import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '**/*.min.js',
      '**/*.min.css',
    ],
  },

  js.configs.recommended,

  ...vue.configs['flat/recommended'],

  {
    files: ['src/**/*.{js,ts,vue}', '*.config.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'vue/multi-word-component-names': 'off',
    },
  },

  prettier,
];

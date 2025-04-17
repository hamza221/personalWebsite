import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
      }
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        process: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: prettierPlugin
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: false,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 100,
        endOfLine: 'auto'
      }]
    }
  }
]
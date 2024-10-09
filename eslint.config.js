import globals from 'globals'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import airbnbBase from 'eslint-config-airbnb-base/rules/style'
import airbnbES6 from 'eslint-config-airbnb-base/rules/es6'
import airbnbBestPractices from 'eslint-config-airbnb-base/rules/best-practices'
import airbnbVariables from 'eslint-config-airbnb-base/rules/variables'
import airbnbErrors from 'eslint-config-airbnb-base/rules/errors'

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser, // 使用 TypeScript 解析器
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // 手動加載 Airbnb 的規則
      ...airbnbBase.rules,
      ...airbnbES6.rules,
      ...airbnbBestPractices.rules,
      ...airbnbVariables.rules,
      ...airbnbErrors.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      'semi': ['error', 'always'], // 確保使用分號
      'quotes': ['error', 'single'], // 使用單引號
      'comma-dangle': ['error', 'always-multiline'], // 強制多行結構使用逗號
      "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }],
    },
    settings: {
      react: {
        version: 'detect', // 自動檢測 React 版本
      },
    },
  }
]

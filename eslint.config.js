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
      sourceType: 'module', // 允許使用 ES 模組
      ecmaFeatures: {
        tsx: true,
      },
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

      // 禁用基礎的 no-unused-vars 規則
      'no-unused-vars': 'off',

      // 啟用 TypeScript 的 no-unused-vars 規則，並設置忽略模式
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略以 _ 開頭的參數
          varsIgnorePattern: '^_', // 忽略以 _ 開頭的變量
          args: 'after-used', // 僅在參數被後續使用時檢查
          ignoreRestSiblings: true, // 忽略剩餘屬性
        },
      ],

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

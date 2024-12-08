import url from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const compat = new FlatCompat({ baseDirectory: __dirname })

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'max-len': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
    },
  }
)

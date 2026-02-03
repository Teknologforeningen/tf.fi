import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextVitals,
  eslintConfigPrettier,
  globalIgnores(['./src/migrations/*']),
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

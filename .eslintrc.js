module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // parser: 'babel-eslint',
    // parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  plugins: ['vue'],
  rules: {
    'import/named': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'vue/multi-word-component-names': 0,
    'max-len': [0], // warn, maximum length of 80, tab width 4  max-len: [1, 80, 4]
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before'
          }
        ]
      }
    ],
    'no-unused-expressions': 'off'
  },
  overrides: [
    {
      files: [
        '**/pages/**/*.{js,ts,vue}',
        '**/layouts/**/*.{js,ts,vue}',
        '**/app.{js,ts,vue}',
        '**/error.{js,ts,vue}'
      ],
      rules: {
        semi: [2, 'always'],
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}

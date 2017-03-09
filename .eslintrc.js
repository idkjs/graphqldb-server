module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "prettier"
  ],
  "plugins": [
    "import",
    "prettier"
  ],
  "env": {
    "node": true,
  },
  "rules": {
    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "no-underscore-dangle": 0,
    "arrow-body-style": 0,
    "import/no-extraneous-dependencies": 0,
    "import/imports-first": 0,
    "no-console": 0,
    "import/prefer-default-export": 0,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "no-param-reassign": 0,
    "no-use-before-define": 0
  }
};

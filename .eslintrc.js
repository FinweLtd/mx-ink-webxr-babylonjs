module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        // "linebreak-style": [
        //     "error",
        //     "windows"
        // ],
        "semi": [
            "error",
            "always"
        ],
        "no-var": 1
    }
};

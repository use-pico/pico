import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
        },
    }
);

// module.exports = {
// 	extends: [
// 		'eslint:recommended',
// 		'next',
// 		'prettier',
// 		'turbo',
// 		'plugin:@typescript-eslint/eslint-recommended',
// 		'plugin:@typescript-eslint/recommended',
// 	],
// 	processor: 'disable/disable',
// 	parser: '@typescript-eslint/parser',
// 	parserOptions: {
// 		project: './tsconfig.json',
// 	},
// 	plugins: ['@typescript-eslint', 'eslint-plugin-unicorn', 'disable'],
// 	rules: {
// 		'@next/next/no-html-link-for-pages': 'off',
// 		'@typescript-eslint/ban-ts-comment': 'warn',
// 		'@typescript-eslint/lines-between-class-members': 'off',
// 		'@typescript-eslint/no-empty-interface': 'off',
// 		'@typescript-eslint/no-explicit-any': 'off',
// 		'@typescript-eslint/no-loop-func': 'off',
// 		'@typescript-eslint/no-namespace': 'off',
// 		'@typescript-eslint/no-shadow': 'off',
// 		'@typescript-eslint/no-unused-expressions': 'off',
// 		'arrow-body-style': 'off',
// 		'class-methods-use-this': 'off',
// 		'default-case': 'off',
// 		'import/extensions': 'off',
// 		'import/no-extraneous-dependencies': [
// 			'error',
// 			{devDependencies: true},
// 		],
// 		'import/prefer-default-export': 'off',
// 		'no-await-in-loop': 'off',
// 		'no-console': 'off',
// 		'no-continue': 'off',
// 		'no-nested-ternary': 'off',
// 		'no-plusplus': 'off',
// 		'no-restricted-syntax': 'off',
// 		'no-return-assign': 'off',
// 		'no-underscore-dangle': 'off',
// 		'no-unused-vars': 'off',
// 		'react-hooks/exhaustive-deps': 'off',
// 		'react/function-component-definition': 'off',
// 		'react/jsx-curly-brace-presence': 'off',
// 		'react/jsx-no-useless-fragment': 'off',
// 		'react/jsx-props-no-spreading': 'off',
// 		'react/prop-types': 'off',
// 		'react/react-in-jsx-scope': 'off',
// 		'react/require-default-props': 'off',
// 	},
// 	settings: {
// 		react: {
// 			version: '18',
// 		},
// 	}
// };

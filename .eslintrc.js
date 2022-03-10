const path = require('path');

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'warn',
		'no-console': 'off',
		'react/jsx-filename-extension': 'off',
		eqeqeq: [2, 'allow-null'],
	},
	overrides: [
		{
			files: ['**/*.test.js', '**/*.test.jsx'],
			env: {
				jest: true,
			},
		},
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [['src', path.resolve(__dirname, 'src')]],
				extensions: ['.ts', '.js', '.jsx', '.json'],
			},
		},
	},
};

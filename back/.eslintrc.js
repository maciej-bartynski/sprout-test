module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'ecmaFeatures': {
			'impliedStrict': true
		}
	},
	'rules': {
		'indent': [
			1,
			'tab'
		],
		'linebreak-style': [
			1,
			'windows'
		],
		'quotes': [
			1,
			'single'
		],
		'semi': [
			1,
			'always'
		]
	}
};
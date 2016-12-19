module.exports = {
	entry: './js/main.js',
	output: {
		filename: 'bundle_js/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.hbs/,
				loader:'handlebars-loader',
				exclude: /(node_modules|bower_components)/
			}
		]
	}
}
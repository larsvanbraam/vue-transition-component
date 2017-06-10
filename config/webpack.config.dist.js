/*eslint-disable */
var webpack = require('webpack');
var path = require('path');

module.exports = function()
{
	return {
		resolve: {
			extensions: ['', '.ts', '.js']
		},

		// entry is the "main" source file we want to include/import
		entry: './src/bundle.ts',

		// externals let you tell webpack about external dependencies
		// that shouldn't be resolved by webpack.
		externals: [
			{
				// We're not only telling webpack that lodash should be an
				// external dependency, but we're also specifying how
				// lodash should be loaded in different scenarios

				//lodash: {
				//	root: "_",
				//	commonjs: "lodash",
				//	commonjs2: "lodash",
				//	amd: "lodash"
				//}
			}
		],

		// output tells webpack where to put the bundle it creates
		output: {
			// in the case of a "plain global browser library", this
			// will be used as the reference to our module that is
			// hung off of the window object.
			library: "VueTransition"
		},

		module: {
			loaders: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: 'awesome-typescript-loader',
					query: {
						configFileName: './config/tsconfig.webpack.json'
					}
				}
			]
		},

		plugins: [],
		stats: {
			colors: true
		}
	};
};

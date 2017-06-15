const webpack = require("webpack");
const WebpackSystemRegister = require('webpack-system-register');
const Promise = require('es6-promise');

var uglifyPluginSetting = new webpack.optimize.UglifyJsPlugin({
	sourceMap: false,
	mangle: false
});


var baseConfig = require('../config/webpack.config.dist');

var umd = baseConfig();
umd.output.libraryTarget = "umd";
umd.output.filename = "./dist/vue-transition-component-umd.js";

var umdMin = baseConfig();
umdMin.output.libraryTarget = "umd";
umdMin.output.filename = "./dist/vue-transition-component-umd.min.js";
umdMin.plugins = umdMin.plugins.concat(
	uglifyPluginSetting
);


var amd = baseConfig();
delete amd.output.library;
amd.output.libraryTarget = "amd";
amd.output.filename = "./dist/vue-transition-component-amd.js";


var cjs2 = baseConfig();
delete cjs2.output.library;
cjs2.output.libraryTarget = "commonjs2";
cjs2.output.filename = "./dist/vue-transition-component-commonjs.js";


var system = baseConfig();
delete system.output.library;
system.plugins.push(
	// adds a systemjs wrapper around the normal webpack export
	new WebpackSystemRegister({
		systemjsDeps: [
		],
		registerName: 'vue-transition-component', // optional name that SystemJS will know this bundle as.
	})
);
system.output.filename = "./dist/vue-transition-component-systemjs.js";


var browser = baseConfig();
browser.output.libraryTarget = "var";
browser.output.filename = "./dist/vue-transition-component.js";


var browserMin = baseConfig();
browserMin.output.libraryTarget = "var";
browserMin.output.filename = "./dist/vue-transition-component.min.js";
browserMin.plugins = browserMin.plugins.concat(
	uglifyPluginSetting
);

[umd, umdMin, amd, cjs2, browser, browserMin, system].reduce(function (prev, config) {
	return prev.then(function() {
		return new Promise(function(resolve, reject) {
			webpack(config, function (err, stats)
			{
				if (err)
				{
					console.error('err', err);
					reject(err);
					return;
				}

				var jsonStats = stats.toJson();
				if (jsonStats.errors.length > 0)
				{
					console.error('stats error', jsonStats.errors);
					reject(err);
					return;
				}
				if (jsonStats.warnings.length > 0)
				{
					console.warn('warn', jsonStats.warnings);
				}
				console.log('log', stats.toString());
				resolve();
			});
		});
	});
}, Promise.resolve());

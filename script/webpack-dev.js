var webpack = require("webpack");
var webpackDevServer = require('webpack-dev-server');
var path = require('path');
var baseConfig = require('../config/webpack.config.dist');

var port = 8085;
var serverURI = `webpack-dev-server/client?http://localhost:${port}/`;

var browser = baseConfig();
browser.output.libraryTarget = "var";
browser.output.filename = "./dist/vue-transition-component.js";
browser.output.path = path.join(__dirname, '../dist');
browser.entry = [serverURI, browser.entry];

browser.devtool = 'source-map';
browser.watch = true;
browser.progress = true;
browser.keepalive = true;

var compiler = webpack(browser);
var server = new webpackDevServer(compiler, {
	contentBase: "example/",
	stats: {
		colors: true,
		chunks: false
	}
});

server.listen(port, function(err) {
	if (err) {
		console.log(err);
		return
	}
	console.log(`Listening at http://localhost:${port}\n`);
});

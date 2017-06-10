/**
 * Please see Karma config file reference for better understanding:
 * http://karma-runner.github.io/latest/config/configuration-file.html
 */
module.exports = function(config)
{
	config.set({

		// List of test frameworks we will use. Most of them are provided by separate packages (adapters).
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'source-map-support'],

		// Entry point / test environment builder is also written in TypeScript.
		files: [
			'./test/index.ts'
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./src/**/*.ts': [
				'webpack',
				'sourcemap',
				'coverage'
			],
			'./test/**/*.ts': [
				'webpack'
			]
		},

		webpack: require('./config/webpack.config.test')(),

		// Make dev server silent.
		webpackServer: { noInfo: true },

		// A lot of plugins are available for test results reporting.
		// You can find them here: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

		// Simple summary (printed to the console) and JSON file which we will remap back to TypeScript.
		coverageReporter: {
			dir: 'coverage',
			reporters: [
				// reporters not supporting the `file` property
				{ type: 'json', subdir: '.' },
				// { type: 'lcov', subdir: '.' },

				{ type: 'text' }
			]
		},

		// Map code coverage result back to TypeScript using `karma-remap-istanbul`.
		remapIstanbulReporter: {
			src: 'coverage/coverage-final.json',
			reports: {
				lcovonly: 'coverage/lcov.info',
				html: 'coverage/report'
			},
			timeoutNotCreated: 5000,
			timeoutNoMoreFiles: 1000
		},

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	})
};

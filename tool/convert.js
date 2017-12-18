const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const nrc = require('node-run-cmd');
const confirm = require('confirm-simple');

const actionType = {
	REPLACE: 'replace',
	REMOVE: 'remove',
	RUN: 'run',
};

// Actions
const actions = [
	{
		type: actionType.RUN,
		command: 'sg settings -t ./build-tools/template,./node_modules/vue-transition-component/template',
	},
	{
		type: actionType.RUN,
		command: 'sg settings -d ./src/component',
	},
	{
		type: actionType.REPLACE,
		source: 'template',
		target: './',
	},
	{
		type: actionType.REMOVE,
		target: 'src/page/HomePage',
	},
	{
		type: actionType.RUN,
		command: 'sg transition-page HomePage',
	},
];

/**
 * Replace a file
 * @param source
 * @param target
 */
const replaceFile = function (source, target) {
	fs.copy(`${__dirname}/${source}`, path.resolve(target), {
		overwrite: true,
	});
};

/**
 * Remove a path
 * @param target
 */
const removePath = function (target) {
	rimraf.sync(path.resolve(target));
};

/**
 * Run a command
 * @param command
 */
const runCommand = function (command) {
	nrc.run(command);
};

// Parse files
const parseActions = function (actions) {
	actions.forEach(action => {
		switch (action.type) {
			case actionType.RUN:
				runCommand(action.command);
				break;
			case actionType.REPLACE:
				replaceFile(action.source, action.target);
				break;
			case actionType.REMOVE:
				removePath(action.target);
				break;
			default:
				break;
		}
	});
};

confirm('Running this script will replace files, are you running this on a clean project?', function (ok) {
	if (ok) {
		parseActions(actions);
	}
});


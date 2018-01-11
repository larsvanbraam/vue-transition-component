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
		label: 'Update the seng-generator template path.',
		command: 'sg settings -t ./build-tools/template,./node_modules/vue-transition-component/template',
	},
	{
		type: actionType.RUN,
		label: 'Update the seng-generator component path.',
		command: 'sg settings -d ./src/component',
	},
	{
		type: actionType.REPLACE,
		label: 'Replace files in the skeleton.',
		source: 'template',
		target: './',
	},
	{
		type: actionType.REMOVE,
		label: 'Remove old HomePage.',
		target: 'src/page/HomePage',
	},
	{
		type: actionType.RUN,
		label: 'Generate new HomePage.',
		command: 'sg transition-page HomePage',
	},
];

/**
 * Replace a file
 * @param source
 * @param target
 */
const replaceFile = (source, target) => {
	return fs.copy(`${__dirname}/${source}`, path.resolve(target), {
		overwrite: true,
	});
};

/**
 * Remove a path
 * @param target
 */
const removePath = (target) => {
	return new Promise((resolve, reject) => {
		rimraf(path.resolve(target), {}, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
};

/**
 * Run a command
 * @param command
 */
const runCommand = (command) => {
	return new Promise((resolve, reject) => {
		nrc.run(command, {
			shell: true,
			onDone: resolve,
			onError: reject,
		});
	});
};

// Parse the actions
const parseActions = (actions) => {
	return actions.map(action => () => {
		console.log(`Running - "${action.label}"`);
		switch (action.type) {
			case actionType.RUN:
				return runCommand(action.command);
				break;
			case actionType.REPLACE:
				return replaceFile(action.source, action.target);
				break;
			case actionType.REMOVE:
				return removePath(action.target);
				break;
			default:
				break;
		}
	});
};

// Run promises in a loop after each other
const sequentialPromises = (promises) => {
	return new Promise((resolve, reject) => {
		const promiseCount = promises.length;
		const resolvePromise = promise =>
			promise()
			.then(() => (promises.length > 0 ? resolvePromise(promises.shift()) : resolve()))
			.catch(reason => reject(reason));

		// Start the loop
		if (promises.length > 0) {
			resolvePromise(promises.shift());
		} else {
			resolve();
		}
	});
};

confirm('Running this script will replace files, are you running this on a clean project?', function (ok) {
	if (ok) {
		sequentialPromises(parseActions(actions))
		.then(() => console.log('Done.'))
		.catch(reason => console.log('Failed to execute the script: ', reason));
	}
});


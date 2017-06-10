#!/usr/bin/env node
'use strict';

const path = require('path');
const promise = require('es6-promise');
const promisify = require('es6-promisify');
const promisifyAll = require('es6-promisify-all');
const fs = promisifyAll(require('fs-extra'));
const archiver = require('archiver');

const pkg = require('../package.json');
const version = pkg.version;
const name = pkg.name;

const from = path.resolve(__dirname, '../dist');
const tmp = path.resolve(__dirname, '../_dist');
const to = path.join(path.resolve(__dirname, '../dist'), name, version);
const distName = path.join(path.resolve(__dirname, '..'), name + '-' + version);

const createArchive = (archive, src, dst) =>
{
	return new Promise((resolve, reject) =>
	{
		const output = fs.createWriteStream(dst);

		output.on('close', () =>
		{
			resolve();
		});

		archive.on('error', (err) =>
		{
			reject(err);
		});

		archive.pipe(output);

		archive
			.bulk([
				{ expand: true, cwd: src, src: ['**/*.*'] }
			])
			.finalize();
	})
};

const createDistTar = () =>
{
	const archive = archiver('tar', {
		gzip: true,
		gzipOptions: {
			level: 1
		}
	});

	return createArchive(archive, to, distName + '.tar.gz');
};

const createDistZip = () =>
{
	const archive = archiver('zip', {});
	return createArchive(archive, to, distName + '.zip');
};

const createEs6Zip = () =>
{
	const archive = archiver('zip', {});
	return createArchive(archive, path.join(to, 'es6'), path.join(to, name + '-es6.zip'));
};

Promise.resolve()
	.then(() => fs.moveAsync(from, tmp))
	.then(() => fs.moveAsync(tmp, to))
	.then(createDistTar)
	.then(createDistZip)
	.then(createEs6Zip)
	.then(() => fs.removeAsync(path.join(to, 'es6')))
	.catch(err =>
	{
		console.log(err);
		process.exit(1);
	});

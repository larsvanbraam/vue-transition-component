const {
  asyncForEach,
  connectToServer,
  createDirectory,
  createSftpConnection,
  getFiles,
  readDirectory,
  uploadFile,
} = require('./deploy-utils');

const fs = require('fs');
const path = require('path');
const terminalLink = require('terminal-link');
const chalk = require('chalk');
const { Client } = require('ssh2');

let config;

try {
  config = require('../config/deploy-config');
} catch (e) {
  console.log(
    chalk.red(
      `Unable to fetch the configuration, make sure to setup the ${chalk.underline(
        `./build-tools/config/deploy-config.js`,
      )} file!`,
    ),
  );

  process.exit();
}

const client = new Client();
const platform = process.argv.slice(2).shift();

(async () => {
  const { source, target } = config.path[platform];

  await connectToServer(client, config.connection);
  const sftp = await createSftpConnection(client);
  const list = await readDirectory(sftp, target);

  // TODO: We might need to be able to overwrite a build without manual removal
  if (list)
    return Promise.reject(
      `The directory (${target}) is not empty, aborting to avoid overwriting...`,
    );

  await createDirectory(sftp, target);

  const files = await getFiles(`${source}/**/*`);

  await asyncForEach(files, async file => {
    const fileSource = path.resolve(file);
    const fileTarget = path.resolve(`${target}/${file.replace(source, '')}`);
    // Create the folder on the server if we reach a directory
    if (fs.statSync(fileSource).isDirectory()) {
      return createDirectory(sftp, fileTarget);
    }
    // Upload the file to the server
    return uploadFile(sftp, fileSource, fileTarget);
  });
})()
  .then(() => {
    console.log(
      `🎉 Docs have been generated and uploaded to: ${chalk.bold(
        terminalLink(
          `version ${config.version}`,
          `http://vue-transition-component.larsvanbraam.nl/${platform}/${config.version}/`,
        ),
      )}`,
    );

    client.end();
  })
  .catch(error => {
    console.log(chalk.red(error));
    client.end();
  });

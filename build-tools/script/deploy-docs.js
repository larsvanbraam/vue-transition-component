const { argv } = require('yargs')
  .option('platform', {
    describe: 'The documentation platform.',
    type: 'string',
    demandOption: true,
  })
  .option('source', {
    describe: 'Relative local build location.',
    type: 'string',
    demandOption: true,
  })
  .option('host', {
    describe: 'The host to connect to',
    type: 'string',
    demandOption: true,
  })
  .option('port', {
    describe: 'The port used for the connection',
    type: 'number',
    demandOption: true,
  })
  .option('serverPath', {
    describe: 'Full absolute server path.',
    type: 'string',
    demandOption: true,
  })
  .option('username', {
    describe: 'SFTP username',
    type: 'string',
    demandOption: true,
  })
  .option('password', {
    describe: 'SFTP password.',
    type: 'string',
    demandOption: false,
  })
  .option('privateKey', {
    describe: 'SSH key.',
    type: 'string',
    demandOption: false,
  });
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { Client } = require('ssh2');
const { version } = require('../../package.json');
const {
  asyncForEach,
  connectToServer,
  createDirectory,
  createSftpConnection,
  getFiles,
  readDirectory,
  uploadFile,
} = require('./deploy-utils');

const client = new Client();
const { platform, source, host, port, serverPath, username, privateKey, password } = argv;

(async () => {
  const target = `${serverPath}/${platform}/${version}`;

  await connectToServer(client, {
    host,
    port,
    username,
    password,
    privateKey: Buffer.from(privateKey, 'base64'),
  });

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
    console.log(`🎉 ${platform} have been generated and uploaded to: ${chalk.bold(`version ${version}`)}`);
    client.end();
  })
  .catch(error => {
    console.log(chalk.red(error));
    client.end();
  });

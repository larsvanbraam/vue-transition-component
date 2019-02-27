const glob = require('glob');

/**
 * Create a connection to the server
 * @returns {Promise<*>}
 */
async function connectToServer(client, config) {
  return new Promise((resolve, reject) => {
    client
      .on('ready', error => (error ? reject(error) : resolve(client)))
      .on('error', error => reject(error))
      .connect(config);
  });
}

/**
 * Create an SFTP connection
 * @param client
 * @returns {Promise<*>}
 */
async function createSftpConnection(client) {
  return new Promise((resolve, reject) => {
    client.sftp((error, sftp) => (error ? reject(error) : resolve(sftp)));
  });
}

/**
 * Read a directory
 * @param sftp
 * @param path
 * @returns {Promise<*>}
 */
async function readDirectory(sftp, path) {
  return new Promise(resolve => {
    sftp.readdir(path, (error, list) => {
      resolve(list || null);
    });
  });
}

/**
 * Create a directory on the server
 *
 * @param sftp
 * @param path
 * @returns {Promise<*>}
 */
async function createDirectory(sftp, path) {
  return new Promise((resolve, reject) => {
    sftp.mkdir(path, error => (error ? reject(error) : resolve()));
  });
}

/**
 * Use the Glob module to retrieve a list of all the files/folders in a provided path
 *
 * @param path
 * @returns {Promise<*>}
 */
async function getFiles(path) {
  return new Promise((resolve, reject) => {
    glob(path, (error, files) => (error ? reject(error) : resolve(files)));
  });
}

/**
 * Upload a file to the provided ftp server
 * @param sftp
 * @param source
 * @param target
 * @returns {Promise<*>}
 */
async function uploadFile(sftp, source, target) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(source, target, error => (error ? reject(error) : resolve()));
  });
}

/**
 * Async for each loop
 *
 * @param array
 * @param callback
 * @returns {Promise<void>}
 */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  connectToServer,
  createSftpConnection,
  readDirectory,
  createDirectory,
  getFiles,
  uploadFile,
  asyncForEach,
};

const fs = require('fs');
const { version } = require('../../package');

module.exports = {
  version,
  path: {
    mkdocs: {
      source: './relative/path/to/dist/folder',
      target: `/absolute/path/on/server/mkdocs/${version}`,
    },
    typedoc: {
      source: './relative/path/to/dist/folder',
      target: `/absolute/path/on/server/typedoc/${version}`,
    },
  },
  connection: {
    host: '0.0.0.0',
    port: 22,
    username: 'username',
    privateKey: fs.readFileSync('/path/to/key'),
  },
};

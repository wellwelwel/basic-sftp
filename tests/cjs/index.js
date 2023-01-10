require('dotenv').config({ path: '../../.env' });
const { Client } = require('basic-sftp');

(async () => {
   const { host, port, username, password } = process.env;
   const sftp = new Client();
   await sftp.connect({ host, port, username, password });
   const dirs = (await sftp.readdir(`/${username}/sftp-test`)).map((dir) => dir.filename);
   await sftp.end();

   console.log(dirs);
})();

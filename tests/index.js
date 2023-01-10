import 'dotenv/config';
import { Client } from 'basic-sftp';

const log = (testing) => {
   console.log(`\x1b[1m\x1b[34m➜\x1b[0m \x1b[1m${testing}\x1b[0m`);
};

const { HOST: host, PORT: port, USERNAME: username, PASSWORD: password } = process.env;
const sftp = new Client();
await sftp.connect({ host, port, username, password });

log('ls');
const dirs = await sftp.ls(`/${username}/sftp-test`);

await sftp.end();

console.log(dirs.map((dir) => dir.filename));

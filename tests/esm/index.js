import { config } from 'dotenv';
import { Client } from 'basic-sftp';

config({ path: '../../.env' });
const { host, port, username, password } = process.env;
const sftp = new Client();
await sftp.connect({ host, port, username, password });
const dirs = (await sftp.readdir(`/${username}/sftp-test`)).map((dir) => dir.filename);
await sftp.end();

console.log(dirs);

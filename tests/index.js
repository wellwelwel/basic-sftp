import 'dotenv/config';
import { Client } from 'basic-sftp';

const log = (testing) => {
   console.log(`\x1b[1m\x1b[34m➜\x1b[0m \x1b[1m${testing}\x1b[0m`);
};

const { HOST: host, PORT: port, USERNAME: username, PASSWORD: password } = process.env;
const root = `/${username}/sftp-test`;
const sftp = new Client();
await sftp.connect({ host, port, username, password });

log('ls');
console.log((await sftp.ls(root)).map((dir) => dir.filename));

log('ensureDir');
console.log(await sftp.ensureDir(`${root}/sub1/sub2/sub3`));

log('is');
console.log(await sftp.is(`${root}/hi.curious`));
console.log(await sftp.is(`${root}/sub1`));
console.log(await sftp.is(`${root}/not_exists`));

await sftp.end();

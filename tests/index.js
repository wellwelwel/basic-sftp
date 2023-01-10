import 'dotenv/config';
import { Client } from 'basic-sftp';

const { HOST: host, PORT: port, USERNAME: username, PASSWORD: password } = process.env;
const sftp = new Client();
await sftp.connect({ host, port, username, password });

// readdir
const dirs = await sftp.readdir(`/${username}/sftp-test`);

await sftp.end();

console.log(dirs.map((dir) => dir.filename));

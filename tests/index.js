// @ts-check

import 'dotenv/config';
import { Client } from 'basic-sftp';

const log = (/** @type {any} */ toLog, /** @type {"mtd" | "std"} */ type = 'std') => {
   type === 'mtd' ? console.log(`\x1b[1m${toLog}\x1b[0m`) : console.log('\x1b[34m\x1b[2m➜ \x1b[0m', toLog, '\x1b[0m\n');
};

const { HOST: host, PORT: port, USERNAME: username, PASSWORD: password } = process.env;
const root = `/${username}/sftp-test`;
const sftp = new Client();

log('connect', 'mtd');
log(await sftp.connect({ host, port: port ? +port : 22, username, password }));

log('ls', 'mtd');
log((await sftp.ls(root)).map((dir) => dir.filename));

log('ensureDir', 'mtd');
log(await sftp.ensureDir(`${root}/sub1/sub2/sub3`));

log('is', 'mtd');
log([await sftp.is(`${root}/hi.curious`), await sftp.is(`${root}/sub1`), await sftp.is(`${root}/not_exists`)]);

log('uploadFile', 'mtd');
log(await sftp.uploadFile('./upload.bak', `${root}/sub1/sub2-2/upload.bak`));

log('unlink', 'mtd');
log(await sftp.unlink(`${root}/sub1`));

log('end', 'mtd');
log(await sftp.end());

log('reconnect', 'mtd');
log(await sftp.reconnect());

log('end', 'mtd');
log(await sftp.end());

import { Client } from '../../lib/index.js';
import { resolve } from 'path';

const log = (toLog: any, type: 'mtd' | 'std' = 'std') => {
   type === 'mtd' ? console.log(`\x1b[1m${toLog}\x1b[0m`) : console.log('\x1b[34m\x1b[2m➜ \x1b[0m', toLog, '\x1b[0m\n');
};

const root = '/root/basic-sftp';
const sftp = new Client();

log('connect', 'mtd');
log(await sftp.connect({ host: '127.0.0.1', port: 2222, username: 'root', password: 'root' }));

log('ensureDir', 'mtd');
log(await sftp.ensureDir(`${root}/sub`));

log('uploadFile', 'mtd');
log(await sftp.uploadFile(resolve('upload.bak'), `${root}/sub/upload.bak`));

log('is', 'mtd');
log([await sftp.is(`${root}/sub/upload.bak`), await sftp.is(`${root}/sub`), await sftp.is(`${root}/not_exists`)]);

log('ls', 'mtd');
log((await sftp.ls(root)).map((dir) => dir.filename));

log('downloadFile', 'mtd');
log(await sftp.downloadFile(`${root}/sub/upload.bak`, resolve('download.bak')));

log('unlink', 'mtd');
log(await sftp.unlink(`${root}/sub`));

log('end', 'mtd');
log(await sftp.end());

log('reconnect', 'mtd');
log(await sftp.reconnect());

log('end', 'mtd');
log(await sftp.end());

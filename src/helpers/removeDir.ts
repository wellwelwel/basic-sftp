import { SFTPWrapper } from 'ssh2';

const removeDir = async (path: string, sftp: SFTPWrapper) =>
   await new Promise((resolve, reject) => {
      sftp.rmdir(path, (err) => {
         err ? reject(err) : resolve(true);
      });
   });

export default removeDir;

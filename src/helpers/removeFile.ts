import { SFTPWrapper } from 'ssh2';

const removeFile = async (path: string, sftp: SFTPWrapper): Promise<true> =>
   await new Promise((resolve, reject) => {
      sftp.unlink(path, (err) => {
         err ? reject(err) : resolve(true);
      });
   });

export default removeFile;

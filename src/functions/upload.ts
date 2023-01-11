import { SFTP as sftp } from '../functions/connect';
import ensureDir from './ensureDir.js';
import { dirname, resolve as pathResolve } from 'path';

const upload = (localPath: string, remotePath: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         // Check local path fisrt
         const resolvedPath = pathResolve(localPath);

         await ensureDir(dirname(remotePath));

         sftp.fastPut(resolvedPath, remotePath, (err) => {
            err ? reject(err) : resolve(true);
         });
      } catch (error) {
         reject(error);
      }
   });

export default upload;

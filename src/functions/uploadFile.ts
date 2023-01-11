import { SFTP as sftp } from './connect';
import ensureDir from './ensureDir.js';
import { dirname, resolve as pathResolve } from 'path';

const uploadFile = (localPath: string, remotePath: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         const resolvedPath = pathResolve(localPath);

         await ensureDir(dirname(remotePath));

         sftp.fastPut(resolvedPath, remotePath, (err) => {
            err ? reject(err) : resolve(true);
         });
      } catch (error) {
         reject(error);
      }
   });

export default uploadFile;

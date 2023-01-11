import { SFTP as sftp } from './connect';
import ensureDir from './ensureDir.js';
import { dirname, resolve as pathResolve } from 'path';

const downloadFile = (remotePath: string, localPath: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         const resolvedPath = pathResolve(localPath);

         await ensureDir(dirname(remotePath));

         sftp.fastGet(remotePath, resolvedPath, (err) => {
            err ? reject(err) : resolve(true);
         });
      } catch (error) {
         reject(error);
      }
   });

export default downloadFile;

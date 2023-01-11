import { SFTP as sftp } from '../functions/connect';

const removeDir = async (path: string): Promise<true> =>
   await new Promise(async (resolve, reject) => {
      try {
         sftp.rmdir(path, (err) => {
            err ? reject(err) : resolve(true);
         });
      } catch (error) {
         reject(error);
      }
   });

export default removeDir;

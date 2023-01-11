import { SFTP as sftp } from '../functions/connect';

const removeFile = async (path: string): Promise<true> =>
   await new Promise(async (resolve, reject) => {
      try {
         sftp.unlink(path, (err) => {
            err ? reject(err) : resolve(true);
         });
      } catch (error) {
         reject(error);
      }
   });

export default removeFile;

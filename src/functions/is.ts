import { SFTP as sftp } from '../functions/connect';

const is = async (path: string): Promise<'File' | 'Directory' | null> =>
   await new Promise(async (resolve, reject) => {
      try {
         sftp.lstat(path, (err, stat) => {
            if (err?.message && /No\ssuch\sfile/.test(err?.message)) {
               resolve(null);
               return;
            }

            if (stat.isFile()) {
               resolve('File');
               return;
            }

            if (stat.isDirectory()) {
               resolve('Directory');
               return;
            }

            reject(err);
         });
      } catch (error) {
         reject(error);
      }
   });

export default is;

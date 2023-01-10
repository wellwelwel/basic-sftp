import { SFTP } from '../ssh2.js';

const ensureDir = (path: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      let currentDir = '';

      try {
         const sftp = await SFTP();
         const paths = path.split('/');

         for (const dir of paths) {
            currentDir += dir;

            if (currentDir?.trim().length === 0) continue;

            await new Promise((resolve, reject) => {
               sftp.lstat(currentDir, (err, stat) => {
                  if (err?.message && /No\ssuch\sfile/.test(err?.message)) {
                     sftp.mkdir(currentDir, (err) => {
                        if (err) {
                           reject(err);
                           return;
                        }

                        currentDir += '/';
                        resolve(true);
                     });

                     return;
                  }

                  if (stat.isFile()) {
                     reject(`The path "${currentDir}" exists, but is not a directory`);
                     return;
                  }

                  if (stat.isDirectory()) {
                     currentDir += '/';
                     resolve(true);
                     return;
                  }

                  reject(err);
               });
            });
         }

         resolve(true);
      } catch (error) {
         reject(error);
      }
   });

export default ensureDir;

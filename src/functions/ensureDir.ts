import { SFTP } from '../ssh2.js';
import stat from '../helpers/stat.js';

const ensureDir = (path: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         const dirs = [];
         const paths = path.split('/');
         const sftp = await SFTP();

         for (const dir of paths) {
            dirs.push(dir);

            const currentDir = dirs.join('/');

            if (currentDir.trim().length === 0 || currentDir === '/') continue;

            const currentPathStat = await stat(currentDir, sftp);

            if (currentPathStat === 'Directory') continue;

            if (currentPathStat === null)
               await new Promise(() => {
                  sftp.mkdir(currentDir, (err) => {
                     err ? reject(err) : resolve(true);
                  });
               });

            if (currentPathStat === 'File') {
               reject(new Error(`The path "${currentDir}" exists, but is not a directory`));
               return;
            }
         }

         resolve(true);
      } catch (error) {
         reject(error);
      }
   });

export default ensureDir;

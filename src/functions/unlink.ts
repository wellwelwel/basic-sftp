import stat from '../helpers/stat.js';
import { SFTP } from '../ssh2.js';
import ls from './ls.js';
import removeFile from '../helpers/removeFile.js';
import removeDir from '../helpers/removeDir.js';

const unlink = (path: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         const sftp = await SFTP();

         const pathIs = await stat(path, sftp);

         if (pathIs === null) {
            resolve(true);
            return;
         }

         if (pathIs === 'File') {
            resolve(await removeFile(path, sftp));
            return;
         }

         if (pathIs === 'Directory') {
            const pathContents = (await ls(path)).map((content) => content.filename);

            if (pathContents.length === 0) {
               resolve(await removeDir(path, sftp));
               return;
            }

            for (const contentName of pathContents) {
               const contentPath = `${path}/${contentName}`;
               const contentIs = await stat(contentPath, sftp);

               if (contentIs === null) continue;

               contentIs === 'File' ? await removeFile(contentPath, sftp) : await unlink(contentPath);
            }
         }

         const confirmPathIs = await stat(path, sftp);
         resolve(confirmPathIs === null ? true : await removeDir(path, sftp));
      } catch (error) {
         reject(error);
      }
   });

export default unlink;

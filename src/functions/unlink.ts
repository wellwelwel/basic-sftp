import ls from './ls.js';
import removeFile from '../helpers/removeFile.js';
import removeDir from '../helpers/removeDir.js';
import is from './is.js';

const unlink = (path: string): Promise<true> =>
   new Promise(async (resolve, reject) => {
      try {
         const pathIs = await is(path);

         if (pathIs === null) {
            resolve(true);
            return;
         }

         if (pathIs === 'File') {
            resolve(await removeFile(path));
            return;
         }

         if (pathIs === 'Directory') {
            const pathContents = (await ls(path)).map((content) => content.filename);

            if (pathContents.length === 0) {
               resolve(await removeDir(path));
               return;
            }

            for (const contentName of pathContents) {
               const contentPath = `${path}/${contentName}`;
               const contentIs = await is(contentPath);

               if (contentIs === null) continue;

               contentIs === 'File' ? await removeFile(contentPath) : await unlink(contentPath);
            }
         }

         const confirmPathIs = await is(path);
         resolve(confirmPathIs === null ? true : await removeDir(path));
      } catch (error) {
         reject(error);
      }
   });

export default unlink;

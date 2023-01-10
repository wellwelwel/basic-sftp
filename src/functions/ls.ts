import { FileEntry } from 'ssh2';
import { SFTP } from '../ssh2.js';

const ls = (location: string | Buffer): Promise<FileEntry[]> =>
   new Promise(async (resolve, reject) => {
      try {
         const sftp = await SFTP();

         sftp.readdir(location, (err, list) => {
            err ? reject(err) : resolve(list);
         });
      } catch (error) {
         reject(error);
      }
   });

export default ls;

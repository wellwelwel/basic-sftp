import { FileEntry } from 'ssh2';
import { SFTP as sftp } from '../functions/connect';

const ls = (location: string | Buffer): Promise<FileEntry[]> =>
   new Promise(async (resolve, reject) => {
      try {
         sftp.readdir(location, (err, list) => {
            err ? reject(err) : resolve(list);
         });
      } catch (error) {
         reject(error);
      }
   });

export default ls;

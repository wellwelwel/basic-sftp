import stat from '../helpers/stat.js';
import { SFTP } from '../ssh2.js';

const is = async (path: string) => {
   const sftp = await SFTP();

   return await stat(path, sftp);
};

export default is;

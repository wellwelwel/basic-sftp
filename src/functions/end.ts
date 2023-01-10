import { ssh2 } from '../ssh2.js';

const end = (): Promise<true> =>
   new Promise((resolve, reject) => {
      ssh2
         .on('error', (err) => {
            reject(err);
         })
         .on('end', () => resolve(true))
         .end();
   });

export default end;

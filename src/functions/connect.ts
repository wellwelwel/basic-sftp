import { ConnectConfig } from 'ssh2';
import { SFTP, ssh2 } from '../ssh2.js';

const connect = (access: ConnectConfig): Promise<true> =>
   new Promise((resolve, reject) => {
      try {
         ssh2
            .on('error', (err) => {
               reject(err);
            })
            .on('ready', async () => {
               await SFTP();
               resolve(true);
            })
            .connect(access);
      } catch (error) {
         reject(error);
      }
   });

export default connect;

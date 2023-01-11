import { ConnectConfig, SFTPWrapper } from 'ssh2';
import { ssh2 } from '../ssh2.js';

let cachedAccess: ConnectConfig;

export let SFTP: SFTPWrapper;

const connect = (access: ConnectConfig): Promise<true> =>
   new Promise((resolve, reject) => {
      try {
         ssh2
            .on('error', (err) => {
               reject(err);
            })
            .on('ready', async () => {
               ssh2.sftp((err, sftp) => {
                  if (err) reject(err);
                  else {
                     cachedAccess = Object.assign({}, access);
                     SFTP = sftp;

                     resolve(true);
                  }
               });
            })
            .connect(access);
      } catch (error) {
         reject(error);
      }
   });

export const reconnect = async () => await connect(cachedAccess);

export default connect;

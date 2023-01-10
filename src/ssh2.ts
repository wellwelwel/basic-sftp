import { Client, SFTPWrapper } from 'ssh2';

export const ssh2 = new Client();

export const SFTP = (): Promise<SFTPWrapper> =>
   new Promise((resolve, reject) => {
      try {
         ssh2.sftp((err, sftp) => {
            if (err) reject(err);
            else resolve(sftp);
         });
      } catch (error) {
         reject(error);
      }
   });

export const getConnection = async () => await SFTP();

import { Client as SSH2, ConnectConfig, SFTPWrapper, FileEntry } from 'ssh2';

const ssh2 = new SSH2();

const SFTP = (): Promise<SFTPWrapper> =>
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

export const Client = class {
   connect = (access: ConnectConfig): Promise<boolean> =>
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

   end = (): Promise<true> =>
      new Promise((resolve, reject) => {
         ssh2
            .on('error', (err) => {
               reject(err);
            })
            .on('end', () => resolve(true))
            .end();
      });

   getConnection = async () => await SFTP();

   ls = (location: string | Buffer): Promise<FileEntry[]> =>
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

   ensureDir = (path: string) =>
      new Promise(async (resolve, reject) => {
         let currentDir = '';

         try {
            const sftp = await SFTP();
            const paths = path.split('/');

            for (const dir of paths) {
               currentDir += dir;

               if (currentDir?.trim().length === 0) continue;

               await new Promise((resolve, reject) => {
                  sftp.lstat(currentDir, (err, stat) => {
                     if (err?.message && /No\ssuch\sfile/.test(err?.message)) {
                        sftp.mkdir(currentDir, (err) => {
                           if (err) {
                              reject(err);
                              return;
                           }

                           currentDir += '/';
                           resolve(true);
                        });

                        return;
                     }

                     if (stat.isFile()) {
                        reject(`The path "${currentDir}" exists, but is not a directory`);
                        return;
                     }

                     if (stat.isDirectory()) {
                        currentDir += '/';
                        resolve(true);
                        return;
                     }

                     reject(err);
                  });
               });
            }

            resolve(true);
         } catch (error) {
            reject(error);
         }
      });
};

import { getConnection } from './ssh2.js';
import ls from './functions/ls.js';
import ensureDir from './functions/ensureDir.js';
import connect from './functions/connect.js';
import end from './functions/end.js';

export const Client = class {
   /** Establishes the connection */
   connect = connect;
   /** Closes the connection */
   end = end;
   /** Get original `ssh2.sftp` connection */
   getConnection = getConnection;
   /** Lists the contents of a directory */
   ls = ls;
   /** Creates the path recursively, if it does not exist */
   ensureDir = ensureDir;
};

import { getConnection } from './ssh2.js';
import connect, { reconnect } from './functions/connect.js';
import end from './functions/end.js';
import ls from './functions/ls.js';
import ensureDir from './functions/ensureDir.js';
import is from './functions/is.js';
import upload from './functions/upload.js';
import unlink from './functions/unlink.js';

export const Client = class {
   /** Establishes the connection */
   connect = connect;
   /** Establishes the connection */
   reconnect = reconnect;
   /** Closes the connection */
   end = end;
   /** Get original `ssh2.sftp` connection */
   getConnection = getConnection;
   /** Lists the contents of a directory */
   ls = ls;
   /** Creates the path recursively, if it does not exist */
   ensureDir = ensureDir;
   /** Get the type from path: File | Directory | null */
   is = is;
   /** Uploads a local file to the remote server */
   upload = upload;
   /** Remove all files and directories from a directory, including the directory itself, if it exists */
   unlink = unlink;
};

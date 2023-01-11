import { Client } from 'ssh2';
import { SFTP } from './functions/connect';

export const ssh2 = new Client();

export const getConnection = () => SFTP;

<h2 align="center">Basic SFTP</h2>
<p align="center">🤹🏻‍♀️ A basic promise-based SFTP Client</p>

## Install

```shell
   npm i basic-sftp
```

<hr />

### Usage

#### Import

-  ES Modules

   ```javascript
   import { Client } from 'basic-sftp';
   ```

-  CommonJS

   ```javascript
   const { Client } = require('basic-ftp');
   ```

<hr />

#### Connect

```javascript
const sftp = new Client();

await sftp.connect({
   host: '',
   port: 22,
   username: '',
   password: '',
});
```

-  The connection extends all the [`ssh2`](https://github.com/mscdex/ssh2) options

#### Reconnect

```javascript
await sftp.reconnect();
```

#### Close Connection

```javascript
await sftp.end();
```

<hr />

### Methods

#### ls

-  Lists the contents of a directory

   ```javascript
   await sftp.ls(path);
   ```

#### ensureDir

-  Creates the path recursively, if it does not exist

   ```javascript
   await sftp.ensureDir(path);
   ```

#### is

-  Get the type from path: `File | Directory | null`

   ```javascript
   await sftp.is(path);
   ```

   -  `File` means that the remote path is a **file**
   -  `Directory` means that the remote path is a **directory**
   -  `null` means that the remote path **doesn't exist**

#### uploadFile

-  Uploads a local file to the remote server

   ```javascript
   await sftp.uploadFile(path);
   ```

#### unlink

-  Remove all files and directories from a directory, including the directory itself, if it exists

   ```javascript
   await sftp.unlink(path);
   ```

#### getConnection

-  Brings up the original [`ssh2.sftp`](https://github.com/mscdex/ssh2/blob/master/SFTP.md) methods

   ```javascript
   sftp.getConnection();
   ```

<hr />

-  [ ] Features
   -  [x] [`ls`](./src/functions/ls.ts)
   -  [x] [`is`](./src/functions/is.ts)
   -  [x] [`ensureDir`](./src/functions/ensureDir.ts)
   -  [x] [`unlink`](./src/functions/unlink.ts)
   -  [x] [`uploadFile`](./src/functions/upload.ts)
   -  [ ] `uploadDir`
   -  [ ] `downloadFile`
   -  [ ] `downloadDir`

<hr />

### Credits

| Contributions | GitHub                                                                             |
| ------------- | ---------------------------------------------------------------------------------- |
| Author        | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |

<hr />

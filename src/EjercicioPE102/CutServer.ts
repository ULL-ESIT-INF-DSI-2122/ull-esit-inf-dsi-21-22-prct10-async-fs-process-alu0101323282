import * as net from 'net';
import {existsSync, watchFile} from 'fs';
import {spawn} from 'child_process';

/**
 * Server that provides watchfile and cut services
 */
export class CutServer {
  /**
  * Server constructor
  * @param fileName File name
  * @param cutColumn Column to cut
  */
  constructor(fileName: string, cutColumn: string) {
    net.createServer((connection) => {
      console.log('A client has connected.');

      connection.write(`Connection established: watching file ${fileName}.\n`);

      watchFile(fileName, (curr, prev) => {
        if (!existsSync(fileName)) {
          connection.write('\nFile not found');
          connection.end();
        }
        connection.write(`Size of file ${fileName} was ${prev.size}.\n`);
        connection.write(`Size of file ${fileName} now is ${curr.size}.\n`);

        const cut = spawn('cut', ['-d', ',', '-f', `${cutColumn}`, `${fileName}`]);
        cut.stdout.on('data', (piece) => {
          const pieces = piece.toString().split('\n');
          pieces.pop();
          connection.write(JSON.stringify(pieces));
        });
      });
      connection.on('close', () => {
        console.log('A client has disconnected.');
      });
    }).listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}

if (process.argv.length !== 4) {
  console.log('Please, provide a filename, and a column to cut');
} else if (!existsSync(process.argv[2])) {
  console.log('File not found');
} else {
  const fileName = process.argv[2];
  const cutColumn = process.argv[3];
  new CutServer(fileName, cutColumn);
}
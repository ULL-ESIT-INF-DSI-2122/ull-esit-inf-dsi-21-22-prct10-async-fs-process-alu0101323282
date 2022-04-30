import {existsSync, watchFile} from 'fs';
import {spawn} from 'child_process';

/**
 * Server that provides watchfile and cut services
 */
export class Cut {
  /**
  * Server constructor
  * @param fileName File name
  * @param cutColumn Column to cut
  */
  constructor(fileName: string, cutColumn: string) {
    watchFile(fileName, (curr, prev) => {
      if (!existsSync(fileName)) {
        console.log('\nFile not found');
      }
      console.log(`Size of file ${fileName} was ${prev.size}.\n`);
      console.log(`Size of file ${fileName} now is ${curr.size}.\n`);

      const cut = spawn('cut', ['-d', ',', '-f', `${cutColumn}`, `${fileName}`]);
      cut.stdout.on('data', (piece) => {
        const pieces = piece.toString().split('\n');
        pieces.pop();
        console.log(JSON.stringify(pieces));
      });
    });
  }
}

if (process.argv.length !== 4) {
  console.log('Please, provide a filename, and a column to cut');
} else if (!existsSync(process.argv[2])) {
  console.log('File not found');
} else {
  /*
  const fileName = process.argv[2];
  const cutColumn = process.argv[3];
  new Cut(fileName, cutColumn);*/
}
import {spawn} from 'child_process';
import EventEmitter = require('events');

/**
 * Class to find words in a text file.
 */
export class WordFinder extends EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    super();
  }
  /**
   * Finds a word in a text file using pipes.
   * @param fileName File name.
   * @param word Word to find.
   */
  pipesFind(fileName: string, word: string): void {
    const cat = spawn('cat', [`${fileName}`]);
    const grep = spawn('grep', [`${word}`]);
    let found: boolean = false;
    cat.stderr.on('data', (err) => {
      console.log(`Error finding the word`);
      this.emit('catError', err);
    });
    cat.stdout.pipe(grep.stdin);
    grep.stdout.on('data', (piece) => {
      let count: number = 0;
      let i: number = 0;
      while (piece.toString().indexOf(`${word}`, i) !== -1) {
        count ++;
        i = piece.toString().indexOf(`${word}`, i) + 1;
      }
      console.log(`Word found ${count} time/s`);
      this.emit('pipes', `Word found ${count} time/s`);
      found = true;
    });
    grep.on('close', () => {
      if (!found) {
        console.log('Word not found');
        this.emit('word', 'Word not found');
      }
    });
  }
  /**
   * Finds a word in a text file.
   * @param fileName File name.
   * @param word Word to find.
   */
  find(fileName: string, word: string): void {
    const cat = spawn('cat', [`${fileName}`]);
    cat.stdout.on('data', (datos) => {
      const grep = spawn(`grep '${word}' <<< '${datos}'`, {
        shell: '/bin/bash',
      });
      let found: boolean = false;
      grep.stdout.on('data', (piece) => {
        let count: number = 0;
        let i: number = 0;
        while (piece.toString().indexOf(`${word}`, i) !== -1) {
          count ++;
          i = piece.toString().indexOf(`${word}`, i) + 1;
        }
        console.log(`Word found ${count} time/s`);
        this.emit('noPipes', `Word found ${count} time/s`);
        found = true;
      });
      grep.on('close', () => {
        if (!found) {
          console.log('Word not found');
          this.emit('noWord', 'Word not found');
        }
      });
    });
    cat.stderr.on('data', (err) => {
      console.log(`Error finding the word`);
      this.emit('error', err);
    });
  }
}
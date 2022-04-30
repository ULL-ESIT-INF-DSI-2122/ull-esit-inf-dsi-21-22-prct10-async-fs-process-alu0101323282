import {spawn} from 'child_process';
import EventEmitter = require('events');
import {existsSync, mkdir, rename, rm} from 'fs';

/**
 * Class to wrap linux commands.
 */
export class Wrapper extends EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    super();
  }

  /**
   * Checks if a file is a directory.
   * @param path File path to check.
   */
  directoryOrFile(path: string): void {
    if (!existsSync(path)) {
      console.log('File or directory not found');
      this.emit('notFound', 'File or directory not found');
    } else {
      const directory = spawn(`test -d ${path} && echo "Found/Exists"`, {
        shell: true,
      });
      const file = spawn(`test -f ${path} && echo "Found/Exists"`, {
        shell: true,
      });
      directory.stdout.on('data', () => {
        console.log('Is a directory');
        this.emit('directory', 'Is a directory');
      });
      file.stdout.on('data', () => {
        console.log('Is a file');
        this.emit('file', 'Is a file');
      });
    }
  }

  /**
   * Creates a directory.
   * @param path Directory path to create.
   */
  createDirectory(path: string) {
    mkdir(`${path}`, (err) => {
      if (err) {
        console.log('Error creating the directory');
        this.emit('mkdirError', err.message);
      } else {
        console.log('Directory created');
        this.emit('mkdir', 'Directory created');
      }
    });
  }

  /**
   * Lists the files in a directory.
   * @param path Directory path to list files.
   */
  listFiles(path: string) {
    const ls = spawn('ls', [`${path}`]);
    ls.stdout.on('data', () => {
      ls.stdout.pipe(process.stdout);
      this.emit('ls', 'Files listed');
    });
    ls.stderr.on('data', () => {
      console.log('Error listing files');
      this.emit('lsError', 'Error listing files');
      ls.kill();
    });
  }

  /**
   * Shows the content of a file.
   * @param path File path to show content.
   */
  showContent(path: string) {
    const cat = spawn('cat', [`${path}`]);
    cat.stdout.on('data', () => {
      cat.stdout.pipe(process.stdout);
      this.emit('cat', 'Content showed');
    });
    cat.stderr.on('data', () => {
      console.log('Error show file\'s content');
      this.emit('showError', 'Error show file\'s content');
    });
  }

  /**
  * Removes a file.
  * @param path File path to remove.
  */
  remove(path: string) {
    rm(`${path}`, {recursive: true}, (err) => {
      if (err) {
        console.log('Error removing the file');
        this.emit('rmError', err.message);
      } else {
        console.log('File removed');
        this.emit('rm', 'File removed');
      }
    });
  }

  /**
   * Moves a file.
   * @param src Old file path.
   * @param dst New file path.
   */
  move(src: string, dst: string) {
    rename(src, dst, (err) => {
      if (err) {
        console.log('Error moving the file');
        this.emit('moveError', err.message);
      } else {
        console.log('File moved');
        this.emit('move', 'File moved');
      }
    });
  }
}
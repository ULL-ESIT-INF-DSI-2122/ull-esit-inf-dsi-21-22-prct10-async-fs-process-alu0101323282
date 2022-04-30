import EventEmitter = require('events');
import {FSWatcher, watch} from 'fs';

/**
 * Class to watch a user's notes directory.
 */
export class DirectoryWatcher extends EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    super();
  }
  /**
   * Watches a user's notes directory.
   * @param user User
   * @param directory Notes directory
   */
  watchDirectory(user: string, directory: string): FSWatcher {
    console.log(`Watching ${user} notes`);
    const watcher = watch(directory);
    watcher.on('rename', (filename) => {
      console.log(`The note ${filename} has been removed`);
      this.emit('rename', `The note ${filename} has been removed`);
    });
    watcher.on('change', (filename) => {
      console.log(`The note ${filename} has been created/modified`);
      this.emit('change', `The note ${filename} has been created/modified`);
    });
    watcher.on('error', (err) => {
      console.log('Error watching the directory');
      this.emit('error', err.message);
    });
    return watcher;
  }
}
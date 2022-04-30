import * as yargs from 'yargs';
import {DirectoryWatcher} from './DirectoryWatcher';

yargs.command({
  command: 'watch',
  describe: 'Watch a user\'s directory',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    directory: {
      describe: 'Directory to watch',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.directory === 'string') {
      const watcher: DirectoryWatcher = new DirectoryWatcher();
      watcher.watchDirectory(argv.user, argv.directory);
    }
  },
}).parse();

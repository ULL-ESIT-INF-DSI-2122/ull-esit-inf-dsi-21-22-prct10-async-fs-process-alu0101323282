import * as yargs from 'yargs';
import {Wrapper} from './Wrapper';

const wrapper: Wrapper = new Wrapper();

yargs.command({
  command: 'check',
  describe: 'Checks if a given path is a file or a directory',
  builder: {
    path: {
      describe: 'Path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.directoryOrFile(argv.path);
    }
  },
}).command({
  command: 'mkdir',
  describe: 'Creates a new directory',
  builder: {
    path: {
      describe: 'Path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.createDirectory(argv.path);
    }
  },
}).command({
  command: 'ls',
  describe: 'Shows a directory\'s files',
  builder: {
    path: {
      describe: 'Path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.listFiles(argv.path);
    }
  },
}).command({
  command: 'cat',
  describe: 'Shows the contents of a file',
  builder: {
    path: {
      describe: 'Path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.showContent(argv.path);
    }
  },
}).command({
  command: 'remove',
  describe: 'Removes a file/directory',
  builder: {
    path: {
      describe: 'Path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      wrapper.remove(argv.path);
    }
  },
}).command({
  command: 'move',
  describe: 'Moves a file/directory',
  builder: {
    src: {
      describe: 'source',
      demandOption: true,
      type: 'string',
    },
    dst: {
      describe: 'destin',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.src === 'string' && typeof argv.dst === 'string') {
      wrapper.move(argv.src, argv.dst);
    }
  },
}).parse();
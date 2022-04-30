import * as yargs from 'yargs';
import {WordFinder} from './WordFinder';

yargs.command({
  command: 'find',
  describe: 'Find a word in a file',
  builder: {
    filename: {
      describe: 'Filename',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Word',
      demandOption: true,
      type: 'string',
    },
    pipes: {
      describe: 'Find words using pipes',
      demandOption: false,
      type: 'boolean',
    },
  },
  handler(argv) {
    if (typeof argv.filename === 'string' && typeof argv.word === 'string') {
      const finder: WordFinder = new WordFinder;
      if (argv.pipes) {
        console.log('Using pipes:');
        finder.pipesFind(argv.filename, argv.word);
      } else {
        console.log('Not using pipes:');
        finder.find(argv.filename, argv.word);
      }
    }
  },
}).parse();


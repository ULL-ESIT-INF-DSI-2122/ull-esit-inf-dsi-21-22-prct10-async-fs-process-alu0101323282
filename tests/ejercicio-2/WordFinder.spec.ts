import 'mocha';
import {expect} from 'chai';
import {WordFinder} from '../../src/ejercicio-2/WordFinder';

describe('Pruebas clase WordFinder', () => {
  let finder: WordFinder;
  before(function() {
    finder = new WordFinder();
  });
  it('pipesFind() Error', (done) => {
    finder.on('catError', (message) => {
      expect(message.toString()).to.be.equal('cat: src/pruebas.txt: No such file or directory\n');
      done();
    });
    finder.pipesFind('src/pruebas.txt', 'Hola');
  });
  it('pipesFind() Word found', (done) => {
    finder.on('pipes', (message) => {
      expect(message.toString()).to.be.equal('Word found 3 time/s');
      done();
    });
    finder.pipesFind('src/prueba.txt', 'Hola');
  });
  it('pipesFind() Word not found', (done) => {
    finder.on('word', (message) => {
      expect(message.toString()).to.be.equal('Word not found');
      done();
    });
    finder.pipesFind('src/prueba.txt', 'palabra');
  });
  it('find() Error', (done) => {
    finder.on('error', (message) => {
      expect(message.toString()).to.be.equal('cat: src/pruebas.txt: No such file or directory\n');
      done();
    });
    finder.find('src/pruebas.txt', 'Hola');
  });
  it('find() word ', (done) => {
    finder.on('noPipes', (message) => {
      expect(message.toString()).to.be.equal('Word found 3 time/s');
      done();
    });
    finder.find('src/prueba.txt', 'Hola');
  });
  it('find() test', (done) => {
    finder.on('noWord', (message) => {
      expect(message.toString()).to.be.equal('Word not found');
      done();
    });
    finder.find('src/prueba.txt', 'palabra');
  });
});
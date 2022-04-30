import 'mocha';
import {expect} from 'chai';
import {DirectoryWatcher} from '../../src/ejercicio-3/DirectoryWatcher';
import {EventEmitter} from 'events';

describe('Pruebas clase DirectoryWatcher', () => {
  let watcher: DirectoryWatcher;
  let emiter: EventEmitter;
  before(function() {
    watcher = new DirectoryWatcher();
    emiter = watcher.watchDirectory('User', 'src/ejercicio-3/Notas/User');
  });
  it('watchDirectory() rename', (done) => {
    watcher.on('rename', (message) => {
      expect(message.toString()).to.be.equal('The note prueba.txt has been removed');
      done();
    });
    emiter.emit('rename', 'prueba.txt');
  });
  it('watchDirectory() change', (done) => {
    watcher.on('change', (message) => {
      expect(message.toString()).to.be.equal('The note prueba.txt has been created/modified');
      done();
    });
    emiter.emit('change', 'prueba.txt');
  });
  it('watchDirectory() error', (done) => {
    watcher.on('error', (message) => {
      expect(message).to.be.equal(undefined);
      done();
    });
    emiter.emit('error', 'prueba.txt');
  });
});
import 'mocha';
import {expect} from 'chai';
import {Wrapper} from '../../src/ejercicio-4/Wrapper';

describe('Pruebas clase Wrapper', () => {
  let wrapper: Wrapper;
  before(function() {
    wrapper = new Wrapper();
  });
  it('directoryOrFile() File or directory not found', (done) => {
    wrapper.on('notFound', (message) => {
      expect(message.toString()).to.be.equal('File or directory not found');
      done();
    });
    wrapper.directoryOrFile('x');
  });
  it('directoryOrFile() Is a directory', (done) => {
    wrapper.on('directory', (message) => {
      expect(message.toString()).to.be.equal('Is a directory');
      done();
    });
    wrapper.directoryOrFile('src');
  });
  it('directoryOrFile() Is a file', (done) => {
    wrapper.on('file', (message) => {
      expect(message.toString()).to.be.equal('Is a file');
      done();
    });
    wrapper.directoryOrFile('README.md');
  });
  it('createDirectory() Directory created', (done) => {
    wrapper.on('mkdir', (message) => {
      expect(message.toString()).to.be.equal('Directory created');
      done();
    });
    wrapper.createDirectory('testDir');
  });
  it('createDirectory() Error creating the directory', (done) => {
    wrapper.on('mkdirError', (message) => {
      expect(message.toString()).to.be.equal('EEXIST: file already exists, mkdir \'README.md\'');
      done();
    });
    wrapper.createDirectory('README.md');
  });
  it('listFiles() Files listed', (done) => {
    wrapper.on('ls', (message) => {
      expect(message.toString()).to.be.equal('Files listed');
      done();
    });
    wrapper.listFiles('src');
  });/*
  it('listFiles() Error', (done) => {
    wrapper.on('lsError', (message) => {
      expect(message.toString()).to.be.equal(`Error listing files`);
      done();
    });
    wrapper.listFiles('x');
  });*/
  it('showContent() Content showed', (done) => {
    wrapper.on('cat', (message) => {
      expect(message.toString()).to.be.equal('Content showed');
      done();
    });
    wrapper.showContent('README.md');
  });/*
  it('showContent() Error', (done) => {
    wrapper.on('showError', (message) => {
      expect(message.toString()).to.be.equal('Error show file\'s content');
      done();
    });
    wrapper.showContent('x');
  });*/
  it('move() Error', (done) => {
    wrapper.on('moveError', (message) => {
      expect(message.toString()).to.be.equal(`ENOENT: no such file or directory, rename 'x' -> 'src/x'`);
      done();
    });
    wrapper.move('x', 'src/x');
  });
  it('move() File moved', (done) => {
    wrapper.on('move', (message) => {
      expect(message.toString()).to.be.equal('File moved');
      done();
    });
    wrapper.move('testDir', 'src/testDir');
  });
  it('remove() File removed', (done) => {
    wrapper.on('rm', (message) => {
      expect(message.toString()).to.be.equal('File removed');
      done();
    });
    wrapper.remove('src/testDir');
  });
  it('remove() Error', (done) => {
    wrapper.on('rmError', (message) => {
      expect(message.toString()).to.be.equal('ENOENT: no such file or directory, stat \'testDir\'');
      done();
    });
    wrapper.remove('testDir');
  });
});
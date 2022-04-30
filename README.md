# __Práctica 10 - Sistema de ficheros y creación de procesos en Node.js__

## Marc Carbonell González de Chaves

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101323282)

## __Tareas previas__
- Acepté la [asignación de GitHub Classroom](https://classroom.github.com/a/HGuJ39-8) asociada a esta práctica.
- Me familiaricé con el [API de callbacks proporcionada por Node.js para interactuar con el sistema de ficheros](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#callback-api).
- Me familiaricé con el [API asíncrona proporcionada por Node.js para crear procesos](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#asynchronous-process-creation) y, en concreto, con la función `spawn`.

## __Ejercicios__

### __Ejercicio 1__
Traza de ejecución:

- Pila de llamadas:
- Registro de eventos:
- Cola de manejadores:
- Consola:

  ⬇️
- Pila de llamadas:
- Registro de eventos:
- Cola de manejadores:
- Consola:  

``` typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

### __Ejercicio 2__

``` typescript
export class WordFinder extends EventEmitter {
  constructor() {
    super();
  }
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
```

### __Ejercicio 3__

``` typescript
export class DirectoryWatcher extends EventEmitter {
  constructor() {
    super();
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
```

### __Ejercicio 4__

``` typescript
export class Wrapper extends EventEmitter {
  constructor() {
    super();
  }
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
  listFiles(path: string) {
    const ls = spawn('ls', [`${path}`]);
    ls.stdout.on('data', () => {
      ls.stdout.pipe(process.stdout);
      this.emit('ls', 'Files listed');
    });
    ls.stderr.on('data', () => {
      console.log('Error listing files');
      this.emit('lsError', 'Error listing files');
    });
  }
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
```

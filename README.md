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
Traza de ejecución del siguiente código:

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

- Pila de llamadas:
                       
    `if (process.argv.length !== 3)`
- Registro de eventos:
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:

    `const filename = process.argv[2];`
- Registro de eventos:
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:

    `if (err)`

    `access(filename, constants.F_OK, (err) => {..}`
- Registro de eventos:
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:

    `console.log('Starting to watch file ${filename}');`

    `access(filename, constants.F_OK, (err) => {..}`
- Registro de eventos:
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:

    `const watcher = watch(process.argv[2]);` 

    `access(filename, constants.F_OK, (err) => {..}`
- Registro de eventos:
- Cola de manejadores:
- Consola: `Starting to watch file helloworld.txt`

    ⬇️
- Pila de llamadas:

    `watcher.on('change', () => {..}` 

    `access(filename, constants.F_OK, (err) => {..}`
- Registro de eventos:
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:

    `console.log('File ${filename} is no longer watched');`

    `access(filename, constants.F_OK, (err) => {..}`     
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola: `File helloworld.txt is no longer watched`

    ⬇️
    
 (En este momento se realiza una modificación en el fichero helloworld.txt)
- Pila de llamadas:
- Registro de eventos:

    `on('change', () => {console.log(File ${filename} has been modified somehow');});`
- Cola de manejadores:

    `() => {console.log('File ${filename} has been modified somehow');`
- Consola:

    ⬇️
- Pila de llamadas:

    `console.log('File ${filename} has been modified somehow');`
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola: `File helloworld.txt has been modified somehow`
   
    ⬇️
    
 (En este momento se realiza otra modificación en el fichero helloworld.txt)
- Pila de llamadas:
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:

    `() => {console.log('File ${filename} has been modified somehow');`
- Consola:

   ⬇️
- Pila de llamadas:

    `console.log('File ${filename} has been modified somehow');`
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola:

    ⬇️
- Pila de llamadas:
- Registro de eventos:

    `on('change', () => {console.log('File ${filename} has been modified somehow');});`
- Cola de manejadores:
- Consola: `File helloworld.txt has been modified somehow`

Cabe destacar que en esta traza no se ha tenido en cuenta que la función asíncrona `fs.watch` suele emitir los eventos de 2 en 2, ya que este no es un comportamiento habitual en el resto de funciones de este tipo.

¿Qué hace la función access?

La función `acces` es una función asíncrona que comprueba los permisos de un archivo o directorio determinado.

¿Para qué sirve el objeto constants?

El objeto `constants` es un valor entero que indica el permiso que se va a comprobar. En el caso del código anterior, `constants.F_OK` indica si el archivo es visible para el proceso principal, esto es útil para determinar si un archivo existe, que es, precisamente, para lo que se utiliza en este caso.


### __Ejercicio 2__
Para este ejercicio cree la clase `WordFinder` que hereda de `EventEmitter` y que contine dos métodos para buscar palabras en un archivo de texto, uno haciendo uso del método `pipe` de un Stream para poder redirigir la salida del comando `cat` hacia el comando `grep`, y el otro sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios. La palabra y el archivo en el que buscar serán pasados como parámetros desde la línea de comandos haciendo uso del paquete yargs.

- pipesFind(): Este método utiliza la función asíncrona `spawn` para crear los dos subprocesos `cat` y `grep` y redirige la salida del primero hacia el segundo con `pipe`. Tras esto se registra un manejador que se activará al recibir datos desde la salida del comando `grep` (grep.stdout.on('data')), dichos datos contendrán una cadena de carácteres con las líneas en las que se ha encontrado la palabra a buscar. Una vez obtenidas la líneas en las que se encuentra la palabra buscada, se cuentan el número de ocurrencias de dicha palabra mediante un bucle `while` y el método `indexOf()` de string, y se imprime un mensaje informativo por pantalla.

  Para detectar los casos en los que no se encuentra la palabra a buscar, se utiliza un booleano `found` que por defecto tendrá el valor `false` y que se marcará como `true` en caso de encontrar la palabra en cuestión. De esta forma, se registra un manejador que se activará cuando se cierre el subproceso `grep` (grep.on(`close`)) y que en caso de que `found` sea `false` mostrará un mensaje por pantalla informando de que la palabra no ha sido encontrada.

- find(): Este método funciona igual que el anterior, pero para redirigir la salida de un comando hacia el otro, se crea el subproceso `cat` con la función asíncrona `spawn` para después, mediante un manejador que se activa al recibir datos desde la salida de dicho proceso (cat.stdout.on('data')), pasar dichos datos recibidos como parámetro al comando `grep` en la creación de dicho subproceso. 
 
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

Para este ejercicio cree la clase `DirectoryWatcher` que hereda de `EventEmitter` y que contine el método `watchDirectory` que observa los cambios producidos en un directorio. El usuario y el directorio a observar serán pasados como parámetros desde la línea de comandos haciendo uso del paquete yargs.

- watchDirectory(): Este método utiliza la función asíncrona `watch` para observar los cambios realizados en el directorio a observar y registra manejadores que en caso de creación/modificación (watcher.on('change')) o de eliminación (watcher.on('rename')) muestran por pantalla un mensaje informativo.

¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?

Dentro del manejador del evento `change`, que es el que indica que un archivo ha sido creado o modificado, utilizaría la función asíncrona `readFile` para mostrar el contenido del archivo en cuestión.

¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación de notas?

Utilizaría la función `watch` con la opción `recursive` activada para observar los cambios en el directorio general que contiene todos los directorios de los usuarios.
```typecript
watch('/NoteAppDirectories', {recursive: true});
```

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

# gen-fs
[![Build Status](https://api.travis-ci.org/MikailBag/gen-io.svg)](https://travis-ci.org/MikailBag/gen-io)

[![NPM](https://nodei.co/npm/gen-io.png?downloads=true)](https://nodei.co/npm/gen-io/)

[![Dependency Status](https://david-dm.org/mikailbag/gen-io.svg)](https://david-dm.org/mikailbag/gen-io)

[![devDependency Status](https://david-dm.org/mikailbag/gen-io/dev-status.svg)](https://david-dm.org/mikailbag/gen-io#info=devDependencies)

Provides async io in generator wrapper.
you can see example in [example/base.js](https://github.com/MikailBag/gen-io/blob/master/example/base.js)

## examples
just writes google port to file.
```javascript
    let genio = require('gen-io');
    genio(function* (io) {
        let ports = yield io.dns.resolve('google.com','A');
        let fd = yield io.fs.open('./ports.txt');
        io.fs.write(fd, ports.toString())
    });
    
```

"sync" TCP server
```javascript
    let server=require('net').createServer()
    let genio=require('gen-io');
    genio(function* (io) {
        while(true) {
            let socket = yield io.util.wait(server,'connection');
            //echo
            socket.pipe(socket);
        }
    });
    server.listen(8124)

```

## Troubleshooting
goes [here](https://github.com/MikailBag/gen-io/issues/new)

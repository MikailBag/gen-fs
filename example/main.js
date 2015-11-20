'use strict';

const genio = require('..');
//var util = require('../util');
const fs = require('fs');
const ansi = require('ansi');
const cursor = ansi(process.stdout);
const assert = require('assert');


var sample = __dirname + '/sample.txt';

function part(part) {
    cursor
        .green()
        .bg.grey()
        .write(`----------${part}----------\n`)
        .reset()
}
function apiFn(name, signature, desc) {
    cursor
        .write(`\t- `)
        .blue()
        .write(`${name}`)
        .green()
        .write(`${signature}\n`)
        .yellow()
        .write(`\t\t${desc}\n`)
        .reset();
}

genio(function* (io) {
//intro
    console.log(['this is example of some features of gen-io',
        'install: npm i gen-io -S',
        'usage: genfs(function* (io){generator, using io () objects? containing async calls? supported by gen-io})']
        .join('\n'));
    part('fs');
    console.log(`lets open file ${sample}`);
    var fd = yield io.fs.open(sample, 'r');
    console.log(`fd of sample.txt is ${fd}\n lets now read its content`);
    var content = yield io.fs.readFile(sample);
    console.log(`content of './sample.txt' is ${content}`);

    part('dns');
    console.log('Only one example. Lets see at ips of google.com');
    var ports = yield io.dns.resolve('google.com', 'A');
    console.log(`Google is running on following ports:`);
    cursor.yellow();
    for (var port in ports) {
        cursor.write(`\t${ports[port]}\n`)
    }
    cursor.reset();
    part('utilities');
    apiFn('read', '(stream)', 'Returns one chunk of stream');
    apiFn('wait', '(eventEmitter,eventName)', `Waits for emiiting "eventName" by "eventEmitter
    \t\treturns first arg, passed to cb`);
    console.log('lets now know fd of sample by event "open" and its first chunk');
    var stream = fs.createReadStream(sample);
    fd = yield io.util.wait(stream, 'open');
    var filepart = yield io.util.read(stream);
    console.log(`first chunk of sample is ${filepart}, its fd is ${fd}`);
    part('plugin API');
    console.log(`now it isn't very big (1 function), but it can be useful. Example:\n
    new io component:foo foo()->'bar'`);
    io = genio.ctx({
        foojs: {
            foo: function foo(cb) {
                process.nextTick(()=>
                    cb(null, 'bar')
                );

            }
        }
    });
    let bar = yield io.foojs.foo();
    assert.equal('bar', bar);
    console.log(`and bar is ${bar}`)
});
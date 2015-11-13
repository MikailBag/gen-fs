var genfs = require('..');
//var util = require('../util');
var fs = require('fs');
var ansi = require('ansi');
var cursor = ansi(process.stdout);

var base = __dirname;
var sample = base + '\\sample.txt';

function part(part) {
    cursor
        .green()
        .bg.grey()
        .write(`----------${part}----------\n`)
        .reset()
}
function apiFn(name,signature, desc) {
    cursor
        .blue()
        .write(`- ${name}${signature} \n\t${desc}\n `)
        .reset();
}

genfs(function* (io) {
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
    apiFn('read','(stream)','Returns one chunk of stream');
    apiFn('wait','(eventEmitter,eventName)',`Waits for emiiting "eventName" by "eventEmitter
    \treturns first arg, passed to cb`);
    var stream = fs.createReadStream(sample);

    fd = yield io.util.wait(stream, 'open');
    var filepart = yield io.util.read(stream);


    console.log(fd);
    console.log(`part of me is ${filepart}, its fd is ${fd}`);
});
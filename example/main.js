var genfs = require('..');
var util = require('../util');
var fs=require('fs');
genfs(function* (io) {

//console.log(io.util.read());

    var fd = yield io.fs.open(__filename, 'r');
    console.log(`fs: ${fd}`);
    var content = yield io.fs.readFile(`${__filename}`);
    console.log(`content of ${__filename} is ${content}`);
    var yandexPort = yield io.dns.resolve('yandex.ru', 'A');
    console.log(`yandex is running on port ${yandexPort[0]}` );


    //you can also 'sync' read from streams
    var stream=fs.createReadStream(__filename);
    var part=yield io.util.read(stream);
    console.log(`part of me is ${part.toString()}`);
});
var fs = require('fs');
var util = require('./util');

module.exports = exports = Object.create(null);
exports.open = function open(path, flags, mode, cb) {
    util.requireArguments([3,4],arguments);
    //console.log(`params: ${util.inspect(arguments)}`);
    if ([3, 4].indexOf(arguments.length) === -1) {

        arguments[arguments.length - 1]/*is gen-fs-provided callback*/(`expected 3 or 4 params, got ${arguments.length}`)
    }
    if (!cb) {
        cb = mode;
        mode = undefined;
    }

    fs.open(path, flags,mode||0o666, cb)
};
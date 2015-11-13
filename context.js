var util = require('./util');
var modules = ['fs', 'child_process', 'dns', 'http', 'https', 'process'];
//TODO classes
for (var module of modules) {
    exports[module] = require(module)
}

exports.util = {};
exports.util.read = function (stream, cb) {
    stream.once('data', function (chunk) {
        cb(null, chunk);
    })
};
exports.util.wait = function (ee, event, cb) {
    ee.on(event, function (data) {
        cb(null, data)
    })

};

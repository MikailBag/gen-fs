var genfs = require('..');

genfs(function* (fs) {
    //process.exit(1);
    //console.log(fs);
    var fd = yield fs.open(__dirname+'/main.js','r');

    console.log(`fd is ${fd}`);
});
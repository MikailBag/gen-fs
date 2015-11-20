require('fs').createWriteStream('./example/sample.txt').write('just sample', function cb(err) {

    process.exit(err ? 1 : 0);
});
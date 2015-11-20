var fs=require('fs');
fs.createWriteStream('./example/sample.txt').write('just sample', function cb(err) {
console.log('sample.txt created successfully');
 console.log('current content of ./example dir is ',fs.readdirSync('./example'));

    process.exit(err ? 1 : 0);
});
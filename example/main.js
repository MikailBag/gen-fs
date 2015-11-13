var genfs=require('..');
genfs(function* (fs){
    //console.log(fs);
    var fd=yield fs.open('main.js');
    process.exit(1);
    console.log(`fd is ${fd}`);
});
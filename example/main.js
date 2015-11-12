var genfs=require('..');
genfs(function* (fs){
    //console.log(fs);
    var fd=yield fs.open('main.js');
    console.log(fd);
});
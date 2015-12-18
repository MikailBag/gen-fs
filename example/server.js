var http=require('http');

require('./../lib')(function*(io){
    var server=http.createServer();
    server.listen(8124);
    while(true){
        var req=yield io.util.wait(server,'request');
        console.log(req.url);
    }
});
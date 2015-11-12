module.exports=function(generator){
var gen=generator.call(ctx);
var result;
while(true){
var task=generator.next(result);
//...

}

}

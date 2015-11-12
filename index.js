var ctx=require('./ctx');
//example of ctx: {read:func,open:func...}
module.exports=function(generator){
    var gen=generator.call(ctx);
    var result;
    while(true){
    var task=generator.next(result);
    task(nextIteration)
//...
//end????
    }

}

//TODO rename to gen-io

var context = require('./context');
var util = require('./util');
var ctx = util.prepareCtx(context);
//example of ctx: {read:func,open:func...}
module.exports = function exports(generator, errCallback) {
    //console.log(`generator will be called with ctx ${util.inspect(ctx)}`);
    var gen = generator(ctx);
    var result;
    var errback = errCallback ? errCallback : function (err) {
        throw err;
    };
    //errback can be used for handling all exceptions, throwing during work of module and generator;

    function nextIteration(nextValue) {
        var returned;
        try {
            //generator can throw an error
            returned = gen.next(nextValue);
            result = returned.value;
        } catch (err) {
            return errback(err);
        }
        //console.log(result);
        if (returned.done) {
            //generator ended his work
            return;
        }

        result.args.push(function (err, value) {
            if (err) {
                return errback(err);
            }
            nextIteration(value)
        });
        return result.fn.apply(global, result.args)

    }

    process.nextTick(nextIteration);
};

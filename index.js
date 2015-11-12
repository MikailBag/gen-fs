var context = require('./context');
var utils = require('./utils');
var ctx = utils.prepareCtx(context);
//example of ctx: {read:func,open:func...}
module.exports = function exports(generator) {
    var gen = generator(ctx);
    var result;

    function nextIteration(nextValue) {
        result = gen.next(nextValue).value;
        //console.log(result);

        if (result.stack && result.message) {
            throw result;
        } else if (result) {
            result.args.push(function (value) {
                nextIteration(value)
            });
            result.fn.apply(global, result.args)
        }
    }

    process.nextTick(nextIteration);
};

var context = require('./context');
var utils = require('./utils');
var ctx = utils.prepareCtx(context);
//example of ctx: {read:func,open:func...}
module.exports = function exports(generator) {
    var gen = generator.call(ctx);
    var result;

    function nextIteration() {
        var task = gen.next(result);
        if (typeof task === "function") {
            task(nextIteration);
        }

        else if (task.stack && task.message) {
            throw task;
        }
    }
process.nextTick(nextIteration);
};

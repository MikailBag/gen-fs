'use strict';
/**
 *
 *
 * @module genio
 */
var log=require('./logger');

var Context = require('./context');
var util = require('./util');
var context = Context.compile.modules({'fs':'fs',http: 'http',https: 'https',dns: 'dns',util: './util'});

log.info('context is %j',context);

/**
 * exports
 * @method
 * @for genio
 * @param {Generator} generator g will called with io;
 * Function* (io :Io) => any
 * @param {Function} [errCallback] used for handling all exceptions, throwing during work of generator
 * Function(err: Error) => any
 * @return {Undefined} undefined
 */
module.exports = exports = function exports(generator, errCallback, sync) {
    var gen = generator(context);
    var result;
    var errback = errCallback ? errCallback : function (err) {
        console.error(`args: ${util.inspect(arguments)}`);
        gen.throw(err);
    };

    function nextIteration(nextValue) {
        var returned;
        try {
            //generator can throw an error
            returned = gen.next(nextValue);
            result = returned.value;
        } catch (err) {
            return errback(err);
        }
        if (returned.done) {
            //generator ended his work
            return;
        }

        result.args.push(function (err, value) {
            if (err) {
                return errback(err);
            }
            nextIteration(value);
        });
        return result.fn.apply(result.ctx||global, result.args)

    }

//generator will start async
    if (sync) {
        nextIteration()
    } else {
        process.nextTick(nextIteration);
    }

};
/**
 * Extend ctx
 * @method
 * @for genio
 * @param {Object} newctx obj to extend default context with
 * @deprecated use Context.append instead
 *
 *
 *
 * */
exports.ctx = function ctx(newctx) {
    if (!newctx) {
        return ctx;
    } else {
        return util.appendCtx(ctx, newctx);
    }
};
exports.Context=Context;
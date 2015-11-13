
'use strict';
module.exports = exports = require('util');
function prepareCtxPart(ctx) {
    var newCtx = {};
    for (let key in ctx) {

        (function (key) {
           //TODO ignore constructors
            newCtx[key] = function () {
                //which will be called in generator
                return {
                    fn: ctx[key],
                    args: Array.prototype.slice.call(arguments)
                }
            }
        }(key));
    }
    return newCtx;
}
exports.prepareCtxPart = prepareCtxPart();
exports.prepareCtx = function prepareCtx(ctx) {
    var newCtx = {};
    var keys = Object.getOwnPropertyNames(ctx);
    for (var key of keys) {

        newCtx[key] = prepareCtxPart(ctx[key]);
    }
    return newCtx;
};
exports.requireArguments = function (arr, args) {
    //TODO allow passing two numbers as range
    var validator = function (args) {
        if (arr.indexOf(args.length) === -1) {
            throw new Error(`expected ${arr.join(', or ')} arguments, got ${args.length}`);
        }
    };
    if (args) {
        validator(args);
    } else {
        return validator
    }


};


'use strict';
module.exports = exports = require('util');
const ctxMarker = Symbol('gen-io/util.js marker of compiled ctx');
;


//TODO Context
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
function isCtx(obj) {
    return obj && obj[ctxMarker];
}
exports.prepareCtxPart = prepareCtxPart();
function prepareCtx(ctx) {
    var newCtx = {};
    var keys = Object.getOwnPropertyNames(ctx);
    for (var key of keys) {

        newCtx[key] = prepareCtxPart(ctx[key]);
    }
    newCtx[ctxMarker] = true;
    return newCtx;
}
exports.prepareCtx = prepareCtx;
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
exports.appendCtx = function appendCtx(ctx, addition) {
    let _ = require('lodash');
    if (!isCtx(ctx)) {
        ctx = prepareCtx(ctx);
    }
    if (!isCtx(addition)) {
        addition = prepareCtx(addition);
    }
    return _.merge(ctx, addition);

};

/**
 *
 * @api private
 * */
exports.ctxMarker = ctxMarker;



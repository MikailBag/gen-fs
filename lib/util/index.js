'use strict';
var util = require('util');
var _ = require('lodash');



module.exports = exports = util;
var Context = require('../context');


//TODO cut on @2
exports.prepareCtxPart = exports.prepareCtx = util.deprecate(Context.compile);
/**
 *
 * @deprecated
 * @@instead new Context()
 *
 *
 * */
function prepareCtx(ctx) {
    var newCtx = {};
    var keys = Object.getOwnPropertyNames(ctx);
    for (var key of keys) {

        newCtx[key] = prepareCtxPart(ctx[key]);
    }
    newCtx[ctxMarker] = true;
    return newCtx;
}

var prepareCtxPart=util.deprecate(Context.compile);


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
        return validator;
    }


};
/**
 *
 *
 * @deprecated
 *
 * */
//TODO cut on @2
exports.appendCtx = function appendCtx(ctx, addition) {
    if (!Context.isContext(ctx)) {
        ctx = prepareCtx(ctx);
    }
    if (!Context.isContext(addition)) {
        addition = prepareCtx(addition);
    }
    return _.merge(ctx, addition);

};

/**
 *
 * @deprecated
 * */
//TODO cut on @2
var ctxMarker=Context.marker;
/**
 *
 * @deprecated
 * */
exports.ctxMarker = ctxMarker;



'use strict';
/**
 * @module util
 *
 * */

var util = require('util');
var _ = require('lodash');



module.exports = exports = util;
var Context = require('../context');


//TODO cut on @2
exports.prepareCtxPart = exports.prepareCtx = util.deprecate(Context.compile);
/**
 * @method
 * @for util
 * @deprecated
 * @param {Object} ctx obj to contextify
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
/**
 * @method
 * @for util
 * @deprecated
 * @param {Object} ctx obj to contextify
 *
 *
 * */
function prepareCtxPart(){
    return Context.compile.apply(this,arguments);
}

/**
 * get a validator for validating arg's number
 * @for util
 * @method
 * @static
 * @param {Array} arr array, which contains acceptable arguments number cases
 * @param {Array} [args] if set, validates it
 * */
exports.requireArguments = function (arr, args) {
    //TODO allow passing two numbers as range
    var validator = function (args) {
        if (arr.indexOf(args.length) === -1) {
            throw new Error('expected %s arguments, got %s',arr.join(', or '),args.length);
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
 * @for util
 * @method
 * @static
 * @deprecated use Context.extend instead
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
 * @static
 * @for util
 * @property
 * @type Symbol
 * @deprecated
 * */
//TODO cut on @2
var ctxMarker=Context.marker;
exports.ctxMarker = ctxMarker;



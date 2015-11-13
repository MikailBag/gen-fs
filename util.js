/**
 * Created by Olga on 12.11.2015.
 */
'use strict';
module.exports = exports = require('util');
exports.prepareCtx = function prepareCtx(ctx) {
    var newCtx = {};
    for (let key in ctx) {

        (function (key) {
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


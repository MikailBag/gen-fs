/**
 * Created by Olga on 12.11.2015.
 */
'use strict';
exports.prepareCtx=function prepareCtx(ctx){
    var newCtx={};
    for(let key in ctx){

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
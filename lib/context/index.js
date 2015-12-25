'use strict';
var util = require('util');
var _ = require('lodash');
var log = require('./../logger');
function Context(obj) {
    function f() {
        return this['()'].apply(this, arguments)
    }

    var ctx = Context.compile(obj);
    ctx[Context.marker] = true;
    _.extend(f, ctx);
    return f;
}
Context.prototype['()'] = function () {
};
Context.marker = Symbol();
Context.isContext = function (obj) {
    return obj && obj[Context.marker];
};
Context.compile = function (obj) {
    if (!obj) {
        return {};
    }
    log.verbose(`Context.compile(): compiling object ${util.inspect(obj)}`);
    var ctx = {};
    var objkeys = Object.getOwnPropertyNames(obj);
    for (let prop in obj) {

        var val = obj[prop];
        var type = typeof val;
        try {
            JSON.stringify(obj[prop])
        } catch (notused) {
            continue;
        }

        if (type == 'string' || type == 'number' || type == 'boolean' || type == 'undefined') {
            log.verbose(`skipping property '${prop}', because it is of primitive type ${type}`);
            continue;
        }
        //TODO skip classes
        log.verbose('compiling %s, it\'s type is %s', prop, type);
        if (type === 'function') {
            ctx[prop] = Context.compile.func(val, prop,obj);
        } else if (type === 'object') {
            ctx[prop] = Context.compile(val);
        }
    }
    log.verbose(`Context.compile(): result is ${util.inspect(ctx)}`);
    return ctx;
};
Context.compile.func = function (func, name,ctx) {
    log.verbose('Context.compile.func(): compiling function %s', func.name || name);
    return function () {
        //which will be called in generator
        return {
            fn: func,
            ctx:ctx,
            args: Array.prototype.slice.call(arguments)
        }
    }
};
Context.compile.module = function (modulename) {
    log.info(`Context.compile.module(): compiling module ${modulename}`);
    var module = require(modulename);
    log.info(`${modulename} is %j`, module);
    module = Context.compile(module);

    log.info('Context.compile.module(): compiled module %s', modulename);
    log.verbose(`Context.compile.module(): compiled module ${modulename} is ${util.inspect(module)}`);
    return module;

};
//console.error()
Context.compile.modules = function (modules) {
    debugger;
    log.info(`Context.compile.modules(): compiling modules: ${util.inspect(modules)}`);
    var compiled = {};
    var moduleslist = Object.getOwnPropertyNames(modules);
    for (var modulename of moduleslist) {
        var modulepath = modules[modulename];
        var compiledModule = Context.compile.module(modulepath);
        compiled[modulename] = compiledModule;
    }
    log.info(`Context.compile.modules(): compiled modules: ${util.inspect(modules)}`);
    return compiled;
};
module.exports = Context;
'use strict';
let util = require('util');
let _ = require('lodash');
const log = require('./../logger');

function Context(obj) {
    function f() {
        return this['()'].apply(this, arguments)
    }

    let ctx = Context.compile(obj);
    ctx[Context.marker] = true;
    _.extend(f, ctx);
    return f;
}
Context.marker = Symbol();
Context.isContext = function (obj) {
    return obj && obj[Context.marker];
};


Context.compile = function (obj) {

    if (!obj) {
       return {};
    }

    log.verbose(`Context.compile(): compiling %j`, obj);

    let ctx = {};
    let objkeys = Object.getOwnPropertyNames(obj);
    for (let prop in obj) {

        if (objkeys.indexOf(prop)===-1) {
            continue;
        }
        let val = obj[prop];
        let type = typeof val;
        log.verbose(`compiling ${prop}, it's type is ${type}`);
        if (type === 'function') {
            ctx[prop] = Context.compile.func(val);
        } else if (type === 'object') {
            ctx[prop] = Context.compile(val);
        }
    }
    log.verbose(`Context.compile(): result is %j`, ctx);
    return ctx;
};

Context.compile.func = function (func) {
    log.verbose(`Context.compile.func(): compiling ${func.name}`);
    return function () {
        //which will be called in generator
        return {
            fn: func,
            args: Array.prototype.slice.call(arguments)
        }
    }
};
Context.compile.module = function (modulename) {
    log.info(`Context.compile.module(): compiling module ${modulename}`);
    let module = require(modulename);
    module = Context.compile(module);
    log.info(`Context.compile.module(): compiled module %s`, modulename);
    log.verbose(`Context.compile.module(): compiled module is %j`, module);
    return module;

};
//console.error()
Context.compile.modules = function (modules) {
    debugger;
    log.info(`Context.compile.modules(): compiling modules: ${modules.toString()}`);
    let compiled = {};
    let moduleslist=Object.getOwnPropertyNames(modules);
    for (let modulename of moduleslist) {
        let modulepath=modules[modulename];
        let compiledModule=Context.compile.module(modulepath);

        compiled[modulename]=compiledModule;
    }
    log.info(`Context.compile.modules(): compiled modules: ${modules.toString()}`);
    return compiled;
};

module.exports = Context;
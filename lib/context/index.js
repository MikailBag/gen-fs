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
Context.marker = Symbol();
Context.isContext = function (obj) {
    return obj && obj[Context.marker];
};


Context.compile = function (obj) {

    if (!obj) {
       return {};
    }

    log.verbose('Context.compile(): compiling %j', obj);

    var ctx = {};
    var objkeys = Object.getOwnPropertyNames(obj);
    for (let prop in obj) {

        if (objkeys.indexOf(prop)===-1) {
            continue;
        }
        var val = obj[prop];
        var type = typeof val;
        if(val==obj) {
            log.verbose(`skipping ${type}, because it is circular`);
            return;
        }
        if(type=='string'||type=='number'){
            log.verbose(`skipping ${type}, because it is of primitive type`);
            return;
        }

        //if(/[A-Z]/.test(prop)){
            //type='class';TODO skip classes
       // }
        log.verbose('compiling %s, it\'s type is %s',prop,type);
        if (type === 'function') {
            ctx[prop] = Context.compile.func(val);
        } else if (type === 'object') {
            ctx[prop] = Context.compile(val);
        }
    }
    log.verbose('Context.compile(): result is %j', ctx);
    return ctx;
};

Context.compile.func = function (func) {
    log.verbose('Context.compile.func(): compiling %s',func.name);
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
    var module = require(modulename);
    module = Context.compile(module);
    log.info('Context.compile.module(): compiled module %s', modulename);
    log.verbose('Context.compile.module(): compiled module is %j', module);
    return module;

};
//console.error()
Context.compile.modules = function (modules) {
    debugger;
    log.info('Context.compile.modules(): compiling modules: %s',modules.toString());
    var compiled = {};
    var moduleslist=Object.getOwnPropertyNames(modules);
    for (var modulename of moduleslist) {
        var modulepath=modules[modulename];
        var compiledModule=Context.compile.module(modulepath);

        compiled[modulename]=compiledModule;
    }
    log.info('Context.compile.modules(): compiled modules: %s',modules.toString());
    return compiled;
};

module.exports = Context;
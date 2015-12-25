var debug=require('debug');
var util=require('util');

module.exports={
    info: debug('gen-io:info'),
    verbose: debug('gen-io:verbose'),
    warn:debug('gen-io:warning')
};
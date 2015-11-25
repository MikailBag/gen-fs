const debug=require('debug');
const util=require('util');

module.exports={
    info: debug('gen-io:info'),
    verbose: debug('gen-io:verbose'),
    warn:debug('gen-io:warning')
};/*{
    info:util.log.bind(console),
        verbose:util.log.bind(console)
}*/
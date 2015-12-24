'use strict';
const nodeRedis=require('redis');
const genio=require('../lib');
const client=nodeRedis.createClient();
genio(function*(){
    let val;
    console.log('creating context from Redis client');
    let redis=new genio.Context(client);
    require('util').inspect(redis);
    console.log('context is ', redis);
    val='works with Redis';
    yield redis.set('gen-io',val);
    console.log('set value');
    val=yield redis.get('gen-io');
    console.log('get value');
    console.log(`gen-io ${val}`);
});/*
client.set('ggg','val',function(err){
    if(err){
        console.error(err);
    }
    client.get('ggg',function(err,val){
        if(err){
            console.error(err);
        }
        console.log(val);
        process.exit(0);
    })
});*/
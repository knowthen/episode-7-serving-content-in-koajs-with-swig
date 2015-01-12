'use strict';
let koa         = require('koa'),
    views       = require('co-views'),
    parse       = require('co-body'),
    colors      = require('colors'),
    swig        = require('swig'),
    inflection  = require('inflection');

swig.setFilter('pluralize', function(input){
  return inflection.pluralize(input);
});

swig.setFilter('inflect', function(input, count){
  count = count || 0;
  return inflection.inflect(input, count);
});

let app = koa();

let render = views(__dirname + '/swig/', {default: 'swig'});

app.use(function *controller(){

  let fileName, doLog, data, body;

  fileName = this.get('swigFile');
  
  doLog = this.get('doLog');
  
  data = yield parse(this);

  body = yield render(fileName, data);

  if(doLog === "true"){
    console.log(body.blue.bgWhite);
  }

  this.body = body; 

});

module.exports = app;

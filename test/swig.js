'use strict';
let assert      = require('assert'),
    request     = require('co-supertest'),
    escapeHtml  = require('escape-html'),
    app         = require('./fixtures/app');

require('co-mocha');

let server = app.listen();

function testHelper(swigFile, contains, doLog, data){
  data = data || {};
  return request(server)
    .post('/')
    .set('swigFile', swigFile)
    .set('doLog', doLog)
    .send(data)
    .expect(200)
    .expect(contains)
    .end();
}

describe('Swig', function(){

  it('should render a passed variable', function *(){
    let name;
    name = 'James';
    yield testHelper('vars', new RegExp(name), false, {name: name});
  });

  it('should escape unsafe content', function *(){

    let userContent, escapedUserContent;
    userContent = '<script>dangerousStuff;</script>';
    escapedUserContent = escapeHtml(userContent);
    yield testHelper('vars', new RegExp(escapedUserContent), 
      false, {name: userContent});
    
  });

  it('should render a list of websites', function *(){

    let sites = ['knowthen.com', 'google.com', 'twitter.com'];
    yield testHelper('loop', new RegExp(sites[0]), false, {sites: sites});
    yield testHelper('loop', new RegExp(sites[1]), false, {sites: sites});
    yield testHelper('loop', new RegExp(sites[2]), false, {sites: sites});

  });

  it('should be ok to drive', function *(){

    yield testHelper('ifelse', /able to drive/, false, {drinksConsumed: 0});

  });

  it('should wait for a bit before driving', function *(){

    yield testHelper('ifelse', /chill for a bit/, false, {drinksConsumed: 1});

  });

  it('should not drive for a while', function *(){

    yield testHelper('ifelse', /not for a while/, false, {drinksConsumed: 3});

  });

  it('better not puke on me', function *(){

    yield testHelper('ifelse', /do not puke on me/, false, {drinksConsumed: 10});

  });

  it('should not show the unbuffered comment', function *(){
    
    let message;
    try{
      yield testHelper('comment', /should not show/, false);
    }
    catch(err){
      message = err.message;
    }
    assert.equal(
      message,
      "expected body '<!-- this comment should show -->\\n'" +
      " to match /should not show/"
    );

  });

  it('parent should show default content when rendered', function *(){
    
    yield testHelper('parent', /default content/, false);

  });

  it('child should show its overridden content', function *(){
    
    yield testHelper('child', /child content/, false);

  });

  it('should include the header from a seperate file', function *(){
    
    yield testHelper('include', /Valid HTML/, false);

  });

  it('should render a anchor from a custom macro', function *(){
    
    yield testHelper('macro', /<a href="google.com" class="favorite">/, false);

  });

  it('should format a date', function *(){

    let date = new Date(2015, 0 , 9);

    yield testHelper('datefilter', /Date: 01-09-2015/, false, {date: date});

  }); 

  it('should pluralize a word', function *(){

    let word = 'country';

    yield testHelper('pluralize', /countries/, false, {word: word});

  });

  it('should inflect a word as singular', function *(){

    let word = 'person';
    let people = ['James']

    yield testHelper('inflect', /person/, false, {word: word, people: people});

  });

  it('should inflect a word as plural', function *(){

    let word = 'person';
    let people = ['James', 'Nathan', 'Scott'];

    yield testHelper('inflect', /people/, false, {word: word, people: people});

  });

  it('should render a more comprehensive example', function *(){

    yield testHelper('index', /Pros and Cons of using Swig/, true, {
        title: 'Pros and Cons',
        pros: [
          'familiar Syntax',
          'inheritance', 
          'macros',
          'filters',
          'very fast',
        ],
        cons: [
          'a bit verbose',
          'no streaming'
        ]
      });

  });
  

});
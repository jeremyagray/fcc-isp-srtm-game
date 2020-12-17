'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const server = require('../server');

chai.use(chaiHttp);

suite('functional tests', function() {
  suite('headers', function() {
    test("should prevent the client from sniffing the MIME type", done => {
      chai.request(server)
        .get('/')
        .end(function(error, response) {
          assert.deepStrictEqual(response.header['x-content-type-options'],
                                 'nosniff');
          done();
        });
    });

    test("should prevent cross-site scripting", function(done) {
      chai.request(server)
        .get('/')
        .end(function(error, response) {
          // Deprecated and dangerous.
          // See https://github.com/helmetjs/helmet/issues/230.
          // assert.deepStrictEqual(response.header['x-xss-protection'],
          //                        '1; mode=block');
          assert.deepStrictEqual(response.header['x-xss-protection'],
                                 '0',
                                'x-xss-protection header should be 0.');
          done();
        });
    });

    test("should prevent client caching", function(done) {
      chai.request(server)
        .get('/')
        .end(function(error, response) {
          assert.deepStrictEqual(response.header['surrogate-control'],
                                 'no-store');
          assert.deepStrictEqual(response.header['cache-control'],
                                 'no-store, no-cache, must-revalidate, proxy-revalidate');
          assert.deepStrictEqual(response.header['pragma'],
                                 'no-cache');
          assert.deepStrictEqual(response.header['expires'],
                                 '0');
          done();
        });
    });

    test("should say that the site is powered by 'PHP 7.4.3'.", function(done) {
      chai.request(server)
        .get('/')
        .end(function(error, response) {
          assert.deepStrictEqual(response.header['x-powered-by'], 'PHP 7.4.3');
          done();
        });
    });
  });

});

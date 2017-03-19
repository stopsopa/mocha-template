'use strict';

const assert        = require('assert');
const path          = require('path');
const curl          = require(path.resolve(__dirname, '..', 'lib', 'curl.jsx'));

// http://localhost:98/?url=http://localhost:99/

describe('Server and parser test', function () {

    it('server test', function (done) {
        curl('http://localhost:99')
            .then(function (res) {
                assert.equal('Server: 0.0.0.0:99 is working...', res.body)
                done()
            });
    })

    it('parser test', function (done) {
        curl('http://localhost:98/?url=http://localhost:99')
            .then(function (res) {
                var expected = `<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Server: 0.0.0.0:99 is working...</pre></body></html>`;
                assert.equal(expected, res.body)
                done()
            });
    })

});
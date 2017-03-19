'use strict';

const assert        = require('assert');
const path          = require('path');
const curl          = require(path.resolve(__dirname, '..', 'lib', 'curl.jsx'));

// http://localhost:1026/?url=http://localhost:1025

describe('Server and parser test', function () {

    it('server test', function (done) {
        curl('http://localhost:1025')
            .then(function (res) {
                assert.equal('Server: 0.0.0.0:1025 is working...', res.body)
                done()
            });
    })

    it('parser test', function (done) {
        curl('http://localhost:1026/?url=http://localhost:1025')
            .then(function (res) {
                var expected = `<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Server: 0.0.0.0:1025 is working...</pre></body></html>`;
                assert.equal(expected, res.body)
                done()
            });
    })

});
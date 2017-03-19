'use strict';

const path = require('path');
const libtotest = require(path.resolve(__dirname, '..', 'src', 'libtotest.js'));
const assert = require('assert');

describe('Example lib test', function () {
    it('first method', function () {
        assert.equal('first value', libtotest.first());
    })
});
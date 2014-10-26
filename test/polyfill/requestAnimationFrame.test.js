'use strict';

var expect = require('chai').expect;

var rAF = require('../../source/scripts/polyfill/requestAnimationFrame')({});

describe('rAF', function() {
    it('should exist', function() {
        /* jshint expr: true */
        expect(rAF).to.exist;
    });
});

'use strict';

var expect = require('chai').expect;

var now = require('../../source/scripts/polyfill/Date.now');

describe('now', function() {
    it('should exist', function() {
        /* jshint expr: true */
        expect(now).to.exist;
    });
});

'use strict';

module.exports = function randomHex(prefix) {
    /* jshint bitwise: false, expr: true */
    var hex = (Math.random() * (0xFFFFFF + 1) << 0).toString(16);
    return (prefix || '#') + new Array(7 - hex.length).join('0') + hex;
};

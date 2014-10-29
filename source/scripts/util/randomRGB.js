'use strict';

module.exports = function randomRgb() {
    /* jshint bitwise: false */
    return 'rgb(' + [
        (Math.random() * 255)|0,
        (Math.random() * 255)|0,
        (Math.random() * 255)|0
    ].join(', ') + ')';
};

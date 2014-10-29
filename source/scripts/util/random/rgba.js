'use strict';

module.exports = function randomRgba() {
    /* jshint bitwise: false */
    return 'rgba(' + [
        (Math.random() * 255)|0,
        (Math.random() * 255)|0,
        (Math.random() * 255)|0,
        (Math.random())
    ].join(', ') + ')';
};

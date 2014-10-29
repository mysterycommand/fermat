'use strict';

module.exports = function randomRange(min, max) {
    if (! max) { max = min; min = 0; }
    return min + (Math.random() * (max - min));
};

'use strict';

module.exports = function randomRange(min, max) {
    return min + (Math.random() * (max - min));
};

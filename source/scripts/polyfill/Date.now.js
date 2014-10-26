'use strict';

/* jshint laxbreak: true */
module.exports = Date.now
    || function now() {
        return new Date().getTime();
    };

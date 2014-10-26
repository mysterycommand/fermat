'use strict';
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

var now = require('./Date.now');
var lastTime = 0;

/* jshint laxbreak: true */
module.exports = function(global) {
    return global.requestAnimationFrame
        || global.webkitRequestAnimationFrame
        || global.mozRequestAnimationFrame
        || global.msRequestAnimationFrame
        || global.oRequestAnimationFrame
        || function requestAnimationFrame(callback) {
            var time = now();
            var timeToCall = Math.max(0, 16 - (time - lastTime));
            var id = global.setTimeout(function() { callback(time + timeToCall); }, timeToCall);
            lastTime = time + timeToCall;
            return id;
        };
};

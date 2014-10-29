/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 * @see  Paul Irish's Gist: https://gist.github.com/paulirish/1579671
 */
/** ================================================================================================================ **/

'use strict';

require('./Date.now');

(function() {
    ['webkit', 'moz'].forEach(function(vendorPrefix) {
        window.requestAnimationFrame = window[vendorPrefix + 'RequestAnimationFrame'];
    });

    if (!! window.requestAnimationFrame) { return; }

    var target = 50 / 3;
    var prevTime = 0;
    var currTime;
    var timeToCall;
    var id;

    window.requestAnimationFrame = function requestAnimationFrame(cb) {
        currTime = Date.now();
        timeToCall = Math.max(0, target - (currTime - prevTime));
        id = setTimeout(function() { cb(currTime + timeToCall); }, timeToCall);
        prevTime = currTime + timeToCall;
        return id;
    };
})();

/* ================================================================================================================== */

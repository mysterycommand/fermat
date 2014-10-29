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
        /* jshint laxbreak: true */
        window.cancelAnimationFrame = window[vendorPrefix + 'CancelAnimationFrame']
            || window[vendorPrefix + 'CancelRequestAnimationFrame'];
    });

    if (!! window.cancelAnimationFrame) { return; }

    window.cancelAnimationFrame = function cancelAnimationFrame(id) {
        clearTimeout(id);
    };
})();

/* ================================================================================================================== */

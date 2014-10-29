/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 * @see  Paul Irish's Gist: https://gist.github.com/paulirish/1579671
 */
/* ================================================================================================================== */

'use strict';

require('./Date.now');

(function() {
    var w = window || {};

    ['webkit', 'moz'].forEach(function(vendorPrefix) {
        /* jshint laxbreak: true */
        w.cancelAnimationFrame = w[vendorPrefix + 'CancelAnimationFrame']
            || w[vendorPrefix + 'CancelRequestAnimationFrame'];
    });

    if (!! w.cancelAnimationFrame) { return; }

    w.cancelAnimationFrame = function cancelAnimationFrame(id) {
        clearTimeout(id);
    };
})();

/* ================================================================================================================== */

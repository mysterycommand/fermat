/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 * @see  http://matt.scharley.me/2012/03/09/monkey-patch-name-ie.html
 */
/* ================================================================================================================== */

'use strict';

(function() {
    if (!! Function.prototype.name) { return; }
    if (! Object.defineProperty) {
        throw new Error('Object.defineProperty is required to properly polyfill Function.prototype.name.');
    }

    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            return this.toString().match(/^function\s*(\w*)/)[1];
        }
    });
})();

/* ================================================================================================================== */

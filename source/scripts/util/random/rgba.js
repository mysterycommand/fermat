/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 */
/** ================================================================================================================ **/

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

/* ================================================================================================================== */

/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 */
/** ================================================================================================================ **/

'use strict';

var slice = require('./slice');

/**
 * This is a (maybe crude) implementation of a generic 'assign', 'extend', or 'copy' function. Copies subsequent
 * sources into the first argument passed.
 *
 * @param   {...}   arguments   One or more arguments. Properties will be copied onto the first argument. Later
 *                              argument's properties will override earlier argument's properties.
 * @return  {Object}            The first argument passed, with all subsequent argument's properties copied
 *                              onto it.
 */
module.exports = function assign() {
    var sources = slice.call(arguments)
        .filter(function(source) {
            return (!! source); // filter out falsey (null) sources
        });

    if (sources.length === 0) { return {}; }
    if (sources.length === 1) { return sources.shift(); }

    var target = sources.shift();
    sources.forEach(function(source) {
        Object.keys(source)
            .forEach(function(key) {
                target[key] = source[key];
            });
    });

    return target;
};

/* ================================================================================================================== */

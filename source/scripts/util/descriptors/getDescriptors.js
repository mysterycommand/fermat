/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 */
/** ================================================================================================================ **/

'use strict';

var isDescriptor = require('./isDescriptor');
var ensureDescriptor = require('./ensureDescriptor');

/**
 * Collects and returns all the own property descriptors from a passed in source.
 *
 * @param   {Object}    src     The object who's own properties will be iterated over to generated the returned
 *                              property descriptor.
 * @return  {Object}            A valid property descriptor for all own properties of 'src'.
 */
module.exports = function getDescriptors(src) {
    if (! src) { return {}; }

    return Object.keys(src).reduce(function(descriptors, key) {
        if (isDescriptor(src[key])) { descriptors[key] = ensureDescriptor(src[key]); }
        else { descriptors[key] = Object.getOwnPropertyDescriptor(src, key); }

        return descriptors;
    }, {});
};

/* ================================================================================================================== */

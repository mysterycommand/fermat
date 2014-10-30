/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 */
/** ================================================================================================================ **/

'use strict';

var slice = require('../slice');
var getDescriptors = require('./getDescriptors');
var ensureDescriptor = require('./ensureDescriptor');

/**
 * Assign descriptors is kind of like 'assign' or 'copy', but it returns a new property descriptor object who's
 * properties are built up out of any sources passed to the function. Later sources property descriptors will
 * override earlier sources property descriptors, but trying to override descriptors marked as non-configurable
 * will throw an error.
 *
 * @return  {Object}    A valid property descriptor with the accumulated values of any sources passed to it.
 */
module.exports = function assignDescriptors() {
    var sources = slice.call(arguments)
        .filter(function(source) {
            return (!! source); // filter out falsey (null) sources
        });

    if (sources.length === 0) { return {}; }
    if (sources.length === 1) { return getDescriptors(sources.shift()); }

    var descriptors = getDescriptors(sources.shift());
    sources.forEach(function(source) {
        Object.keys(getDescriptors(source))
            .forEach(function(key) {
                if (descriptors.hasOwnProperty(key) &&
                    descriptors[key].configurable === false) {
                    // don't override own & non-configurable descriptors
                    throw new TypeError('Cannot redefine property: ', key);
                } else {
                    descriptors[key] = ensureDescriptor(source[key]);
                }
            });
    });

    return descriptors;
};

/* ================================================================================================================== */

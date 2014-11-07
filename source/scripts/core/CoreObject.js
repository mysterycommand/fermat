/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 1.0.0
 */
/** ================================================================================================================ **/

'use strict';

var extend = require('./extend');
var assignDescriptors = require('../util/descriptors/assignDescriptors');
// var getDescriptors = require('../util/descriptors/getDescriptors');
var unique = require('../util/unique');

/**
 * CoreObject is the main "Class" object. It sets up inheritance, and adds some convenient introspection
 * functions.
 */
module.exports = extend(Object, {
    /**
     * Use CoreObject.extend([staticProps], [protoFn]) to create new "subclasses" (that is, constructors
     * with the appropriate prototype chain set up). Proxies out to `/library/core/extend`, but passes
     * the current constructor as the first argument.
     *
     * @param  {Object}     staticProps     An object who's properties will be copied onto the new
     *                                      constructor.
     * @param  {Funciton}   protoFn         A function that will be passed a reference to this constructor's
     *                                      prototype for use as a kind-of "super".
     * @return {[type]}             [description]
     */
    extend: function(staticProps, protoFn) {
        return extend(this, staticProps, protoFn);
    }
}, function(/*Base*/) {
    return {
        // I like to put 'public' accessor members before the constructor.
        instanceDefaults: {
            get: function() {
                var ctor = this.constructor.name;
                var name = ctor.substring(0, 1).toLowerCase() + ctor.substring(1);
                var id = unique(ctor);
                return {
                    _instanceId: {
                        configurable: false,
                        enumerable: false,
                        value: id,
                        writable: false
                    },
                    _instanceName: {
                        configurable: false,
                        enumerable: false,
                        value: name + id,
                        writable: false
                    }
                };
            }
        },

        /**
         * Creates a new instance of CoreObject. By default, anything returned from instanceDefaults will be
         * assigned to this. In objects that extend from CoreObject passing an object to instanceProps will
         * create members on the instance, but in the particular case of CoreObject _instanceId and _instanceName
         * are non-configurable, and non-writable, so trying to override them will throw an error. They are used
         * for introspection (currently they just make instance.toString more meaningful).
         *
         * @param {Object} instanceProps An object who's properties will be copied onto the new instance.
         */
        constructor: function CoreObject(instanceProps) {
            this.define(this.instanceDefaults, instanceProps);
        },

        // I like to declare 'public' data members after the constructor.

        /**
         * Use can for duck-typing your instances. Checks if 'key' is a function in the instance's prototype chain.
         *
         * @param  {String} key     The method name to look for.
         * @return {Boolean}        True if the property exists and is a function, false otherwise.
         */
        can: function(key) {
            return typeof this[key] === 'function';
        },

        /**
         * Use has for duck-typing your instances. Checks if 'key' is an own property of this instance. Also, I just
         * want to point out what an exercise in restraint it is for me not to name this method 'haz', and then chain
         * it (along with can) and add another method 'cheezburger' so that `CoreObject.can.haz.cheezburger === true`.
         * Just sayin'.
         *
         * @param  {String} key     The property name to look for.
         * @return {Boolean}        True if the propery is an own property of this instance.
         */
        has: function(key) {
            return this.hasOwnProperty(key);
        },

        /**
         * Use define to define properties (via [provided or generated] property descriptor object) to instances.
         *
         * @param  {...}     arguments  One or more objects to be converted to property descriptors and then
         *                              defined on this instance.
         * @return {Object}             The object with it's new properties defined.
         */
        define: function() {
            if (! arguments.length) { return this; }
            var descriptors = assignDescriptors(arguments);
            return Object.defineProperties(this, descriptors);
        },

        /**
         * Overrides the native Object.toString to give a more useful string representation of instances.
         *
         * @return {String} A string in the form of "[instanceName ConstructorName]".
         */
        toString: function() {
            return '[' + this.instanceName + ' ' + this.constructor.name + ']';
        },

        /**
         * A public accessor for the automatically generated instance id.
         *
         * @return {String}     A unique id for the instance (generated during construction).
         */
        instanceId: {
            configurable: false,
            get: function() {
                return this._instanceId;
            }
        },

        /**
         * A public accessor for the automatically generated instance name.
         *
         * @return  {String}    A unique name for the instance (generated during construction).
         */
        instanceName: {
            configurable: false,
            get: function() {
                return this._instanceName;
            }
        }
    };
});

/* ================================================================================================================== */

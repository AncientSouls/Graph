'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = undefined;

var _graph = require('./graph.js');

exports.Graph = _graph.Graph;

/**
 * Interface for link state representation.
 * Valid any keys and values, if adaptation methods was able to work with them.
 *
 * @interface Link
 */

/**
 * Some reference to source. Can be undefined.
 *
 * @name Link#source
 */

/**
 * Some reference to target. Can be undefined.
 *
 * @name Link#target
 */

/**
 * Interface for links selection from graph.
 * Valid any keys and values, if adaptation methods was able to work with them.
 * To find an empty value, you need to specify as value undefined.
 * Not specified keys will not participate in the search. 
 *
 * @interface Link
 */

/**
 * Some reference to source.
 *
 * @name Link#source
 */

/**
 * Some reference to target.
 *
 * @name Link#target
 */

/**
 * Interface for links modification.
 * Valid any keys and values, if adaptation methods was able to work with them.
 * To delete some value, just specify it value as undefined.
 * Not specified keys will not participate in the links modification.
 *
 * @interface Link
 */

/**
 * Some reference to source.
 *
 * @name Link#source
 */

/**
 * Some reference to target.
 *
 * @name Link#target
 */
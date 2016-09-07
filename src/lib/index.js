import { Graph } from './graph.js';
import { Graph as ObjectGraph } from './adapters/object.js';
export { Graph, ObjectGraph };

/**
 * Interface for link state representation.
 * Valid any keys and values, if adaptation methods was able to work with them.
 *
 * @interface Link
 */

/**
 * Unique id of link in this graph.
 * Ignored when inserting.
 *
 * @name Link#id
 * @type {string|number}
 */

/**
 * Some reference to source. Can be undefined.
 *
 * @name Link#source
 * @type {string|number|string[]|number[]}
 */

/**
 * Some reference to target. Can be undefined.
 *
 * @name Link#target
 * @type {string|number|string[]|number[]}
 */

/**
 * Interface for links selection from graph.
 * Valid any keys and values, if adaptation methods was able to work with them.
 * To find an empty value, you need to specify as value undefined.
 * Not specified keys will not participate in the search. 
 *
 * @interface LinkSelector
 */

/**
 * Unique id of link in this graph.
 *
 * @name LinkSelector#id
 * @type {string|number}
 */

/**
 * Some reference to source.
 *
 * @name LinkSelector#source
 * @type {string|number|string[]|number[]}
 */

/**
 * Some reference to target.
 *
 * @name LinkSelector#target
 * @type {string|number|string[]|number[]}
 */

/**
 * Interface for links modification.
 * Valid any keys and values, if adaptation methods was able to work with them.
 * To delete some value, just specify it value as undefined.
 * Not specified keys will not participate in the links modification.
 *
 * @interface LinkModifier
 */

/**
 * Some reference to source.
 *
 * @name LinkModifier#source
 * @type {string|number|string[]|number[]}
 */

/**
 * Some reference to target.
 *
 * @name LinkModifier#target
 * @type {string|number|string[]|number[]}
 */

/**
 * Options for links selection methods.
 *
 * @interface SelectOptions
 */

/**
 * Sort order in database syntax.
 *
 * @name SelectOptions#sort
 * @type {Object.<string, boolean>}
 * @description Sorting by source key `{ source: true }`
 */

/**
 * Number of results to skip.
 *
 * @name SelectOptions#skip
 * @type {Number}
 */

/**
 * Maximum number of results.
 *
 * @name SelectOptions#limit
 * @type {Number}
 */
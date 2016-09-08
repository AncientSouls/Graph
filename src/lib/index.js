import { factoryGraph, Graph } from './graph.js';
import { factoryObjectGraph, Graph as ObjectGraph } from './adapters/object.js';
export { factoryGraph, Graph, factoryObjectGraph, ObjectGraph };

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
 * @type {string|number|string[]|number[]|LinkArrayModifier}
 */

/**
 * Some reference to target.
 *
 * @name LinkModifier#target
 * @type {string|number|string[]|number[]|LinkArrayModifier}
 */

/**
 * Interface for link array value modification.
 * If used, it automatically turns all the data in the array.
 *
 * @interface LinkArrayModifier
 */

/**
 * Push into link value some item/items.
 *
 * @name LinkArrayModifier#push
 * @type {string|number|string[]|number[]}
 * @description These modifiers are identical: `{ source: { push: 1 } }` and `{ source: { push: [1] } }`.
 */

/**
 * Push into link value some item/items if not already exists.
 *
 * @name LinkArrayModifier#add
 * @type {string|number|string[]|number[]}
 * @description These modifiers are identical: `{ source: { add: 1 } }` and `{ source: { add: [1] } }`.
 */

/**
 * Remove from link value some item/items.
 *
 * @name LinkArrayModifier#remove
 * @type {string|number|string[]|number[]}
 * @description These modifiers are identical: `{ source: { remove: 1 } }` and `{ source: { remove: [1] } }`.
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
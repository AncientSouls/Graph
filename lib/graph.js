'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This method allows you to use Graph class to its inheritance chain.
 *
 * @param {Class} ParentClass
 * @return {Class} Graph
 */
function factoryGraph(ParentClass) {

  /**
   * Class to inherit. Class with methods for control links in graph.
   * Must be completed for adaptation to a particular database.
   * 
   * @class
   * @description `import { Graph } from 'ancient-graph';`
   */
  var Graph = function () {

    /**
     * Construct new graph and checks for required adaptation methods.
     * @throws {Error} if the adapter methods is not complete
     */
    function Graph() {
      _classCallCheck(this, Graph);

      if (this.insert == Graph.prototype.insert) {
        throw new Error('Method `insert` is not adapted.');
      }
      if (this.update == Graph.prototype.update) {
        throw new Error('Method `update` is not adapted.');
      }
      if (this.remove == Graph.prototype.remove) {
        throw new Error('Method `remove` is not adapted.');
      }
      if (this.query == Graph.prototype.query) {
        throw new Error('Method `query` is not adapted.');
      }
      if (this.options == Graph.prototype.options) {
        throw new Error('Method `options` is not adapted.');
      }
      if (this.fetch == Graph.prototype.fetch) {
        throw new Error('Method `fetch` is not adapted.');
      }
      if (this.each == Graph.prototype.each) {
        throw new Error('Method `each` is not adapted.');
      }
      if (this.map == Graph.prototype.map) {
        throw new Error('Method `map` is not adapted.');
      }
      if (this.on == Graph.prototype.on) {
        throw new Error('Method `on` is not adapted.');
      }
    }

    /**
     * Should insert new link into graph.
     * If the database allows, it is recommended to return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {Link} link
     * @param {Graph~insertCallback} [callback]
     * @param {Object} [context]
     * @return {string} [id]
     */


    _createClass(Graph, [{
      key: 'insert',
      value: function insert(link, callback, context) {}

      /**
       * Optional callback. If present, called with an error object as the first argument and, if no error, the unique id of inserted link as the second.
       *
       * @callback Graph~insertCallback
       * @param {Error} [error]
       * @param {string} [id]
       */

      /**
       * Should update to new state of modifier object link by unique id or by link query object.
       * If the database allows, it is recommended to return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
       * 
       * @param {string|LinkSelector} selector
       * @param {LinkModifier} modifier
       * @param {Graph~updateCallback} [callback]
       * @param {Object} [context]
       * @return {number} [count]
       */

    }, {
      key: 'update',
      value: function update(selector, modifier, callback, context) {}

      /**
       * Optional callback. If present, called with an error object as the first argument and, if no error, the number of affected documents as the second.
       *
       * @callback Graph~updateCallback
       * @param {Error} [error]
       * @param {number} [count]
       */

      /**
       * Should remove link by unique id or by link query object.
       * 
       * @param {string|LinkSelector} selector
       * @param {Graph~removeCallback} [callback]
       * @param {Object} [context]
       */

    }, {
      key: 'remove',
      value: function remove(selector, callback, context) {}

      /**
       * Optional callback. If present, called with an error object as the first argument.
       *
       * @callback Graph~removeCallback
       * @param {Error} [error]
       * @param {number} [count]
       */

      /**
       * Should generate adapter for database query for links search by unique id or by link query object.
       * 
       * @param {string|LinkSelector} selector
       * @return {*} query
       */

    }, {
      key: 'query',
      value: function query(selector) {}

      /**
       * Should generate adapter for database options. 
       * 
       * @param {Object} [options]
       * @return {*} options - a options suitable for the database
       */

    }, {
      key: 'options',
      value: function options(_options) {}

      /**
       * Find and all matching links as an Array.
       * 
       * @param {string|LinkSelector} selector
       * @param {SelectOptions} [options]
       * @param {Graph~fetchCallback} [callback]
       * @return {Link[]} links - result links objects in array
       */

    }, {
      key: 'fetch',
      value: function fetch(selector, options, callback) {}

      /**
       * Optional callback. If present, called with an error object as the first argument and, if no error, the result links objects in array.
       *
       * @callback Graph~fetchCallback
       * @param {Error} [error]
       * @param {Link[]} [links]
       */

      /**
       * Should call callback once for each matching document, sequentially and synchronously.
       * 
       * @param {string|LinkSelector} selector
       * @param {SelectOptions} [options]
       * @param {Graph~eachCallback} [callback]
       */

    }, {
      key: 'each',
      value: function each(selector, options, callback) {}

      /**
       * @callback Graph~eachCallback
       * @param {Link} [link]
       */

      /**
       * Should map callback over all matching documents. Returns an Array.
       * 
       * @param {string|LinkSelector} selector
       * @param {SelectOptions} [options]
       * @param {Graph~mapCallback} [callback]
       * @return {Array} results
       */

    }, {
      key: 'map',
      value: function map(selector, options, callback) {}

      /**
       * @callback Graph~mapCallback
       * @param {Link} [link]
       * @return {*} result
       */

      /**
       * Should subscribe to the events: link, unlink, insert, update, remove.
       * 
       * @param {string} event - name
       * @param {Graph~onCallback} callback
       */

    }, {
      key: 'on',
      value: function on(event, callback) {}

      /**
       * @callback Graph~onCallback
       * @param {Link} [oldLink] - can be undefined on link and insert events
       * @param {Link} [newLink] - can be undefined on unlink and remove events
       * @param {Object} [context] - additional app information, such as context.userId
       */

    }]);

    return Graph;
  }();

  ;

  return Graph;
}

var Graph = factoryGraph();

exports.factoryGraph = factoryGraph;
exports.Graph = Graph;
//# sourceMappingURL=graph.js.map
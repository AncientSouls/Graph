import { Graph as AncientGraph } from '../graph.js';
import lodash from 'lodash';
import { EventEmitter } from 'fbemitter';

/**
 * This method allows you to use ObjectGraph class to its inheritance chain.
 *
 * @param {Class} ParentClassGraph
 * @return {Class} ObjectGraph
 */
function factoryObjectGraph(ParentClassGraph) {
  /**
   * Inherited class. Class with methods for control links in graph.
   * Adapted for array collection.
   * 
   * @class
   * @description `import { ObjectGraph as Graph } from 'ancient-graph';`
   */
  class ObjectGraph extends ParentClassGraph {
    
    /**
     * Construct new graph and checks for required adaptation methods.
     * @param {Array[]} collection
     * @param {Object.<string, string>} fields - matching of fields in the link with fields in document
     * @param {Object} [config] - Additional config.
     * @param {Object} [config.aliases]
     * @param {String} [config.aliases.$]
     * @throws {Error} if the adapter methods is not complete
     */
    constructor(collection, fields, config) {
      super(...arguments);
      this.emitter = new EventEmitter();
    }
    
    /**
     * Specifies the id field on insert
     * 
     * @param {number} index
     * @param {Link} link
     * @return {number|string} id;
     */
    _idGenerator(index, link) {
      return ""+index;
    };
    
    /**
     * Generate insert modifier.
     * 
     * @param {number} index
     * @param {Link} link
     * @return {number|string} id;
     */
    _insertModifier(link) {
      var _modifier = {};
      for (var f in link) {
        if (this.fields[f]) {
          _modifier[this.fields[f]] = link[this.config.aliases[f]];
        }
      }
      return _modifier;
    };
    
    /**
     * Should insert new link into graph.
     * Return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
     * 
     * @param {Link} link
     * @param {Graph~insertCallback} [callback]
     * @param {Object} [context]
     * @return {number|string} [id]
     */
    insert(link, callback, context) {
      this.callback
      var _modifier = this._insertModifier(link);
      var index, error, id;
      try {
        index = this.collection.push(_modifier) - 1;
        if (!this.collection[index].hasOwnProperty(this.fields[this.config.aliases['id']])) {
          id = this.collection[index][this.fields[this.config.aliases['id']]] = this._idGenerator(index, this.collection[index]);
        }
        this.emitter.emit('insert', this.collection[index]);
      } catch(_error) {
        error = _error;
      }
      if (callback) {
        callback(error, id)
      }
      return id;
    }
    
    /**
     * Optional callback. If present, called with an error object as the first argument and, if no error, the unique id of inserted link as the second.
     *
     * @callback Graph~insertCallback
     * @param {Error} [error]
     * @param {number|string} [id]
     */
    
    /**
     * Push into link value some item/items.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */
    _updateModifierPush(data, item) {
      data.push(item);
    }
    
    /**
     * Push into link value some item/items if not already exists.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */
    _updateModifierAdd(data, item) {
      if (lodash.isArray(item)) {
        for (var i in item) {
          this._updateModifierAdd(data, item[i]);
        }
      } else {
        var index = lodash.indexOf(data, item);
        if (index < 0) {
          this._updateModifierPush(data, item);
        }
      }
    }
     
    /**
     * Remove from link value some item/items.
     * 
     * @param {Array} data
     * @param {string|number|string[]|number[]} item
     */
    _updateModifierRemove(data, item) {
      if (lodash.isArray(item)) {
        for (var i in item) {
          this._updateModifierRemove(data, item[i]);
        }
      } else {
        lodash.remove(data, function(value) {
          return value == item;
        });
      }
    }
  
    /**
     * Generate update modifier.
     * 
     * @param {LinkModifier} modifier 
     * @param {Object} result
     * @return {number|string} id;
     */
    _updateModifier(modifier, result) {
      for (var m in modifier) {
        if (this.fields[m]) {
          if (typeof(modifier[m]) == 'undefined') {
            delete result[this.fields[m]];
          } else {
            if (typeof(modifier[m]) == 'object') {
              if (lodash.isArray(modifier[m])) {
                result[this.fields[m]] = modifier[m];
              } else {
                if (!lodash.isArray(result[this.fields[m]])) {
                  result[this.fields[m]] = result[this.fields[m]]?[result[this.fields[m]]]:[];
                }
                for (var key in modifier[m]) {
                  if (key == 'add') {
                    this._updateModifierAdd(result[this.fields[m]], modifier[m][key]);
                  }
                  if (key == 'push') {
                    this._updateModifierPush(result[this.fields[m]], modifier[m][key]);
                  }
                  if (key == 'remove') {
                    this._updateModifierRemove(result[this.fields[m]], modifier[m][key]);
                  }
                }
              }
            } else {
              result[this.fields[m]] = modifier[m];
            }
          }
        }
      }
    };
    
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
    update(selector, modifier, callback, context) {
      var results = this._fetch(selector);
      for (var r in results) {
        var oldResult = lodash.cloneDeep(results[r]);
        this._updateModifier(modifier, results[r]);
        this.emitter.emit('update', results[r], oldResult);
      }
      if (callback) callback(undefined, results.length);
      return results.length;
    }
    
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
    remove(selector, callback, context) {
      var oldLength = this.collection.length;
      var removed = [];
      lodash.remove(this.collection, (result) => {
        var _query = this.query(selector)(result);
        if (_query) removed.push(result)
        return _query;
      });
      for (var r in removed) {
        this.emitter.emit('remove', removed[r]);
      }
      var newLength = this.collection.length;
      if (callback) callback(undefined, oldLength - newLength);
    }
    
    /**
     * Optional callback. If present, called with an error object as the first argument.
     *
     * @callback Graph~removeCallback
     * @param {Error} [error]
     * @param {number} [count]
     */
    
    /**
     * Generate adapter for database query for links search by unique id or by link query object.
     * 
     * @param {string|LinkSelector} selector
     * @return {*} query
     */
    query(selector) {
      var type = typeof(selector);
      if (type == 'string' || type == 'number') {
        return (doc) => { return doc[this.fields[this.config.aliases['id']]] == selector };
      } else if (type == 'object') {
        return (doc) => {
          if (typeof(doc) != 'object') return false;
          for (var m in selector) {
            if (this.fields[m]) {
              if (typeof(selector[m]) == 'undefined') {
                if (doc.hasOwnProperty(this.fields[m])) return false;
              } else {
                if (lodash.isArray(doc[this.fields[m]])) {
                  if (lodash.isArray(selector[m])) {
                    for (var s in selector[m]) {
                      if (!lodash.includes(doc[this.fields[m]], selector[m][s])) {
                        return false;
                      }
                    }
                  } else {
                    if (!lodash.includes(doc[this.fields[m]], selector[m])) {
                      return false;
                    }
                  }
                } else {
                  if (doc[this.fields[m]] != selector[m]) return false;
                }
              }
            }
          }
          return true;
        }
      }
    }
    
    /**
     * Generate adapted for database options object.
     * 
     * @param {Object} [options]
     * @return {*} options - a options suitable for the database
     */
    options(options) {
      var _options = {};
      if (options) {
        if (options.sort) {
          _options.sort = { keys: [], orders: [] };
          for (var s in options.sort) {
            if (this.fields[s]) {
              _options.sort.keys.push(this.fields[s]);
              _options.sort.orders.push(options.sort[s]?'asc':'desc');
            }
          }
        }
        if (typeof(options.skip) == 'number') {
          _options.skip = options.skip;
        }
        if (typeof(options.limit) == 'number') {
          _options.limit = options.limit;
        }
      }
      return _options;
    }
    
    /**
     * Generate Link from document by fields.
     * 
     * @param {Object} document
     * @return {Link} link
     */
    _generateLink(document) {
      var link = {};
      for (var f in this.fields) {
        if (document.hasOwnProperty(this.fields[f])) {
          link[f] = document[this.fields[f]];
        }
      }
      return link;
    }
    
    /**
     * Get one first matching link.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~getCallback} [callback]
     * @return {Link} link - result link object
     */
    get(selector, options, callback) {
      var results = this.fetch(selector, options, (error, results) => {
        if (callback) callback(error, results?results[0]:undefined);
      });
      if (results) return results[0];
    }
    
    /**
     * Fetch native database documents.
     * 
     * @param {string|linkSelector} selector
     * @param {SelectOptions} [options]
     * @return {Object[]} documents - result documents
     */
    _fetch(selector, options) {
      var query = this.query(selector);
      var documents = lodash.filter(this.collection, query); 
      var _options = this.options(options);
      if (_options.sort) documents = lodash.orderBy(documents, _options.sort.keys, _options.orders);
      var skip = _options.skip?_options.skip:0;
      var limit = _options.limit?skip+_options.limit:_options.limit;
      documents = documents.slice(skip, limit);
      return documents;
    }
    
    /**
     * Find and all matching links as an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~fetchCallback} [callback]
     * @return {Link[]} links - result links objects in array
     */
    fetch(selector, options, callback) {
      var documents = this._fetch(selector, options);
      var links = [];
      for (var d in documents) {
        links.push(this._generateLink(documents[d]));
      }
      if (callback) callback(undefined, links);
      return links;
    }
    
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
    each(selector, options, callback) {
      var links = this.fetch(selector, options);
      for (var l in links) {
        callback(links[l]);
      }
    }
    
    /**
     * @callback Graph~eachCallback
     * @param {Link} [link]
     */
    
    /**
     * Map callback over all matching documents. Returns an Array.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~mapCallback} [callback]
     * @return {Array} results
     */
    map(selector, options, callback) {
      var links = this.fetch(selector, options);
      return links.map(callback);
    }
    
    /**
     * @callback Graph~mapCallback
     * @param {Link} [link]
     * @return {*} result
     */
    
    /**
     * Count all matching documents.
     * 
     * @param {string|LinkSelector} selector
     * @param {SelectOptions} [options]
     * @param {Graph~countCallback} [callback]
     * @return {number} [count]
     */
    count(selector, options, callback) {
      var links = this.fetch(selector, options);
      if (callback) callback(undefined, links.length);
      return links.length;
    }
    
    /**
     * @callback Graph~countCallback
     * @param {Error} [error]
     * @param {number} [count]
     */
    
    /**
     * Should subscribe to the events: link, unlink, insert, update, remove.
     * 
     * @param {string} event - One event name
     * @param {Graph~onCallback} callback
     * @returns {Function} Stops event subscription.
     * @example
     * var counter = 0;
     * var stop = graph.on('update', (oldData, newData) => {
     *   if (oldData.id == '1') console.log(oldData.id, 'is changed');
     *   counter++;
     *   if (counter == 3) stop();
     * });
     */
    on(event, callback) {
      var subscriptions = [];
      
      if (event == 'insert') {
        subscriptions.push(this.emitter.addListener('insert', (document) => {
          callback(undefined, this._generateLink(document));
        }));
      }
      if (event == 'update') {
        subscriptions.push(this.emitter.addListener('update', (newDocument, oldDocument) => {
          callback(this._generateLink(oldDocument), this._generateLink(newDocument));
        }));
      }
      if (event == 'remove') {
        subscriptions.push(this.emitter.addListener('remove', (document) => {
          callback(this._generateLink(document), undefined);
        }));
      }
      if (event == 'link') {
        subscriptions.push(this.emitter.addListener('insert', (document) => {
          callback(undefined, this._generateLink(document));
        }));
        subscriptions.push(this.emitter.addListener('update', (newDocument, oldDocument) => {
          callback(this._generateLink(oldDocument), this._generateLink(newDocument));
        }));
      }
      if (event == 'unlink') {
        subscriptions.push(this.emitter.addListener('update', (newDocument, oldDocument) => {
          callback(this._generateLink(oldDocument), this._generateLink(newDocument));
        }));
        subscriptions.push(this.emitter.addListener('remove', (document) => {
          callback(this._generateLink(document), undefined);
        }));
      }
      
      return () => {
        for (var subscription of subscriptions) {
          subscription.remove();
        }
      };
    }
    
    /**
     * @callback Graph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */
  }
  
  return ObjectGraph;
};

var ObjectGraph = factoryObjectGraph(AncientGraph);

export { factoryObjectGraph, ObjectGraph as Graph };
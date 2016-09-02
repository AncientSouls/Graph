import { Graph as AncientGraph } from '../graph.js';
import lodash from 'lodash';
import { EventEmitter } from 'fbemitter';

/**
 * Inherited class. Class with methods for control links in graph.
 * Adapted for array collection.
 * 
 * @class
 * @alias ancient-graph.ObjectGraph
 */
class ObjectGraph extends AncientGraph {
  
  /**
   * Construct new graph and checks for required adaptation methods.
   * @param {Array[]} collection
   * @param {Object} fields - matching of fields in the link with fields in document
   * @param {*} object.source
   * @param {*} object.target
   * @throws {Error} if the adapter methods is not complete
   */
  constructor(collection, fields) {
    super();
    this.collection = collection;
    this.fields = fields;
    this.emitter = new EventEmitter();
  }
  
  /**
   * Should insert new link into graph.
   * Return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
   * 
   * @param {Link} link
   * @param {Graph~insertCallback} [callback]
   * @return {string} [id]
   */
  insert(link, callback) {
    this.callback
    var _modifier = {};
    for (var f in link) {
      if (this.fields[f]) {
        _modifier[this.fields[f]] = link[f];
      }
    }
    try {
      var id = this.collection.push(_modifier) - 1;
      this.collection[id][this.fields['id']] = id;
      this.emitter.emit('insert', this.collection[id]);
      if (callback) {
        callback(undefined, id)
      }
      return id;
    } catch(error) {
      callback(error);
    }
  }
  
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
   * @return {number} [count]
   */
  update(selector, modifier, callback) {
    var results = this._fetch(selector);
    for (var r in results) {
      var oldResult = lodash.cloneDeep(results[r]);
      for (var m in modifier) {
        if (this.fields[m]) {
          if (typeof(modifier[m]) == 'undefined') {
            delete results[r][this.fields[m]];
          } else {
            results[r][this.fields[m]] = modifier[m];
          }
        }
      }
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
   */
  remove(selector, callback) {
    var oldLength = this.collection.length;
    lodash.remove(this.collection, (result) => {
      var _query = this.query(selector)(result);
      if (_query) this.emitter.emit('remove', result);
      return _query;
    });
    var newLength = this.collection.length;
    callback(undefined, oldLength - newLength);
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
      return (doc) => { return doc[this.fields['id']] == selector };
    } else if (type == 'object') {
      return (doc) => {
        for (var m in selector) {
          if (this.fields[m]) {
            if (typeof(selector[m]) == 'undefined') {
              if (doc.hasOwnProperty(this.fields[m])) return false;
            } else {
              if (doc[this.fields[m]] != selector[m]) return false;
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
        _options.sort = [];
        for (var s in options.sort) {
          if (this.fields[s]) {
            _options.sort.push([this.fields[s], options.sort[s]]);
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
   * Fetch native database documents.
   * 
   * @param {string|linkSelector} selector
   * @param {SelectOptions} [options]
   * @return {Object[]} documents - result documents
   */
  _fetch(selector, options) {
    var query = this.query(selector);
    var documents = lodash.filter(this.collection, query); 
    // var _options = this.options(options);
    // if (_options.sort) chain = chain.compoundsort(_options.sort);
    // if (_options.skip) chain = chain.offset(_options.skip);
    // if (_options.limit) chain = chain.limit(_options.limit);
    // return chain.data();
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
   * Should map callback over all matching documents. Returns an Array.
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
   * Should subscribe to the events: link, unlink, insert, update, remove.
   * 
   * @param {string} event - name
   * @param {Graph~onCallback} callback
   */
  on(event, callback) {
    if (event == 'insert') {
      this.emitter.addListener('insert', (document) => {
        callback(undefined, this._generateLink(document));
      });
    }
    if (event == 'update') {
      this.emitter.addListener('update', (newDocument, oldDocument) => {
        callback(this._generateLink(oldDocument), this._generateLink(newDocument));
      });
    }
    if (event == 'remove') {
      this.emitter.addListener('remove', (document) => {
        callback(this._generateLink(document), undefined);
      });
    }
    if (event == 'link') {
      this.emitter.addListener('insert', (document) => {
        callback(undefined, this._generateLink(document));
      });
      this.emitter.addListener('update', (newDocument, oldDocument) => {
        callback(this._generateLink(oldDocument), this._generateLink(newDocument));
      });
    }
    if (event == 'unlink') {
      this.emitter.addListener('update', (newDocument, oldDocument) => {
        callback(this._generateLink(oldDocument), this._generateLink(newDocument));
      });
      this.emitter.addListener('remove', (document) => {
        callback(this._generateLink(document), undefined);
      });
    }
  }
  
  /**
   * @callback Graph~onCallback
   * @param {Link} [oldLink] - can be undefined on link and insert events
   * @param {Link} [newLink] - can be undefined on unlink and remove events
   * @param {Object} [context] - additional app information, such as context.userId
   */
};

export { ObjectGraph as Graph };
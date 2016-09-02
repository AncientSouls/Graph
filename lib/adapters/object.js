'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graph = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graph = require('../graph.js');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fbemitter = require('fbemitter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Inherited class. Class with methods for control links in graph.
 * Adapted for array collection.
 * 
 * @class
 * @description `import { ObjectGraph as Graph } from 'ancient-graph';`
 */
var ObjectGraph = function (_AncientGraph) {
  _inherits(ObjectGraph, _AncientGraph);

  /**
   * Construct new graph and checks for required adaptation methods.
   * @param {Array[]} collection
   * @param {Object} fields - matching of fields in the link with fields in document
   * @param {*} fields.source
   * @param {*} fields.target
   * @throws {Error} if the adapter methods is not complete
   */
  function ObjectGraph(collection, fields) {
    _classCallCheck(this, ObjectGraph);

    var _this = _possibleConstructorReturn(this, (ObjectGraph.__proto__ || Object.getPrototypeOf(ObjectGraph)).call(this));

    _this.collection = collection;
    _this.fields = fields;
    _this.emitter = new _fbemitter.EventEmitter();
    return _this;
  }

  /**
   * Should insert new link into graph.
   * Return a synchronous result. This can be useful in your application. But for writing generic code, it is recommended to only use the callback result.
   * 
   * @param {Link} link
   * @param {Graph~insertCallback} [callback]
   * @return {string} [id]
   */


  _createClass(ObjectGraph, [{
    key: 'insert',
    value: function insert(link, callback) {
      this.callback;
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
          callback(undefined, id);
        }
        return id;
      } catch (error) {
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

  }, {
    key: 'update',
    value: function update(selector, modifier, callback) {
      var results = this._fetch(selector);
      for (var r in results) {
        var oldResult = _lodash2.default.cloneDeep(results[r]);
        for (var m in modifier) {
          if (this.fields[m]) {
            if (typeof modifier[m] == 'undefined') {
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

  }, {
    key: 'remove',
    value: function remove(selector, callback) {
      var _this2 = this;

      var oldLength = this.collection.length;
      _lodash2.default.remove(this.collection, function (result) {
        var _query = _this2.query(selector)(result);
        if (_query) _this2.emitter.emit('remove', result);
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

  }, {
    key: 'query',
    value: function query(selector) {
      var _this3 = this;

      var type = typeof selector === 'undefined' ? 'undefined' : _typeof(selector);
      if (type == 'string' || type == 'number') {
        return function (doc) {
          return doc[_this3.fields['id']] == selector;
        };
      } else if (type == 'object') {
        return function (doc) {
          for (var m in selector) {
            if (_this3.fields[m]) {
              if (typeof selector[m] == 'undefined') {
                if (doc.hasOwnProperty(_this3.fields[m])) return false;
              } else {
                if (doc[_this3.fields[m]] != selector[m]) return false;
              }
            }
          }
          return true;
        };
      }
    }

    /**
     * Generate adapted for database options object.
     * 
     * @param {Object} [options]
     * @return {*} options - a options suitable for the database
     */

  }, {
    key: 'options',
    value: function options(_options2) {
      var _options = {};
      if (_options2) {
        if (_options2.sort) {
          _options.sort = [];
          for (var s in _options2.sort) {
            if (this.fields[s]) {
              _options.sort.push([this.fields[s], _options2.sort[s]]);
            }
          }
        }
        if (typeof _options2.skip == 'number') {
          _options.skip = _options2.skip;
        }
        if (typeof _options2.limit == 'number') {
          _options.limit = _options2.limit;
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

  }, {
    key: '_generateLink',
    value: function _generateLink(document) {
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

  }, {
    key: '_fetch',
    value: function _fetch(selector, options) {
      var query = this.query(selector);
      var documents = _lodash2.default.filter(this.collection, query);
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

  }, {
    key: 'fetch',
    value: function fetch(selector, options, callback) {
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

  }, {
    key: 'each',
    value: function each(selector, options, callback) {
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

  }, {
    key: 'map',
    value: function map(selector, options, callback) {
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

  }, {
    key: 'on',
    value: function on(event, callback) {
      var _this4 = this;

      if (event == 'insert') {
        this.emitter.addListener('insert', function (document) {
          callback(undefined, _this4._generateLink(document));
        });
      }
      if (event == 'update') {
        this.emitter.addListener('update', function (newDocument, oldDocument) {
          callback(_this4._generateLink(oldDocument), _this4._generateLink(newDocument));
        });
      }
      if (event == 'remove') {
        this.emitter.addListener('remove', function (document) {
          callback(_this4._generateLink(document), undefined);
        });
      }
      if (event == 'link') {
        this.emitter.addListener('insert', function (document) {
          callback(undefined, _this4._generateLink(document));
        });
        this.emitter.addListener('update', function (newDocument, oldDocument) {
          callback(_this4._generateLink(oldDocument), _this4._generateLink(newDocument));
        });
      }
      if (event == 'unlink') {
        this.emitter.addListener('update', function (newDocument, oldDocument) {
          callback(_this4._generateLink(oldDocument), _this4._generateLink(newDocument));
        });
        this.emitter.addListener('remove', function (document) {
          callback(_this4._generateLink(document), undefined);
        });
      }
    }

    /**
     * @callback Graph~onCallback
     * @param {Link} [oldLink] - can be undefined on link and insert events
     * @param {Link} [newLink] - can be undefined on unlink and remove events
     * @param {Object} [context] - additional app information, such as context.userId
     */

  }]);

  return ObjectGraph;
}(_graph.Graph);

;

exports.Graph = ObjectGraph;
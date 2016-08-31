'use strict';

var _object = require('../lib/adapters/object.js');

var _basic = require('./basic.js');

var _subscription = require('./subscription.js');

describe('AncientSouls/Graph', function () {
  var collection = [];
  var graph = new _object.Graph(collection, { id: 'id', source: 'source', target: 'target' });
  (0, _basic.InsertUpdateRemoveFetchTest)(graph, [1, 2, 3, 4, 5, 6]);
  (0, _subscription.SubscriptionTest)(graph, [7, 8, 9]);
});
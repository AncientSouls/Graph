'use strict';

var _object = require('../lib/adapters/object.js');

var _complete = require('./complete.js');

var _incomplete = require('./incomplete.js');

var _empty = require('./empty.js');

var _subscription = require('./subscription.js');

describe('AncientSouls/Graph', function () {
  var generateGraph = function generateGraph() {
    var collection = [];
    var graph = new _object.Graph(collection, { id: 'id', source: 'source', target: 'target' });
    return graph;
  };
  (0, _complete.CompleteTest)(generateGraph, [1, 2, 3]);
  (0, _incomplete.IncompleteTest)(generateGraph, [1, 2, 3]);
  (0, _empty.EmptyTest)(generateGraph, [1, 2]);
  (0, _subscription.SubscriptionTest)(generateGraph, [1, 2, 3]);
});
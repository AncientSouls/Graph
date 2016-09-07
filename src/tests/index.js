require('source-map-support').install();

import { Graph } from '../lib/adapters/object.js';
import { CompleteTest } from './complete.js';
import { IncompleteTest } from './incomplete.js';
import { EmptyTest } from './empty.js';
import { HyperTest } from './hyper.js';
import { SubscriptionTest } from './subscription.js';

describe('AncientSouls/Graph', function() {
  var generateGraph = function() {
    var collection = [];
    var graph = new Graph(collection, { id: 'id', source: 'source', target: 'target' });
    return graph;
  };
  CompleteTest(generateGraph, [1, 2, 3]);
  IncompleteTest(generateGraph, [1, 2, 3]);
  EmptyTest(generateGraph, [1, 2]);
  HyperTest(generateGraph, [1, 2, 3]);
  SubscriptionTest(generateGraph, [1, 2, 3]);
});
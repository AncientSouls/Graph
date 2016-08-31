import { Graph } from '../lib/adapters/object.js';
import { InsertUpdateRemoveFetchTest } from './basic.js';
import { SubscriptionTest } from './subscription.js';

describe('AncientSouls/Graph', function() {
  var collection = [];
  var graph = new Graph(collection, { id: 'id', source: 'source', target: 'target' });
  InsertUpdateRemoveFetchTest(graph, [1, 2, 3, 4, 5, 6]);
  SubscriptionTest(graph, [7, 8, 9]);
});
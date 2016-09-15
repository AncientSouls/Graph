# AncientGraph

[![npm version](https://badge.fury.io/js/ancient-graph.svg)](https://badge.fury.io/js/ancient-graph)
[![Join the chat at https://gitter.im/AncientSouls/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AncientSouls/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Graph methods and event handlers based on adapter.

## Install
```bash
npm install --save ancient-graph
```

## Example

### Graph

```js
import { ObjectGraph } from 'ancient-graph';

var collection = [];
var graph = new ObjectGraph(collection, { id: 'id', source: 'source', target: 'target' });

graph.on('link', (oldLink, newLink, context)  => {
  console.log('Link handled');
});

graph.on('unlink', (oldLink, newLink, context)  => {
  console.log('Unlink handled');
});

graph.insert({id: 1, source: 1, target: 1}, (error, id) => {
  id; // 1
}); 
// Link handled

collection; 
/**
 * [
 *   {id: 1, source': 1, target: 1},
 * ]
 */

graph.insert({id: 2, source: 2, target: 1, someText: 4}, (error, id) => {
  id; // 2
});
// Link handled
collection;
/**
 * [
 *   {id: 1, source: 1, target: 1},
     {id: 2, source: 2, target: 1},
 * ]
 */ 

graph.insert({id: 3, source: 1, target: 2}, (error, id) => {
  id; // 2
});
// Link handled

collection; 
/**
 * [
 *   {id: 1, source: 1, target: 1},
     {id: 2, source: 2, target: 1},
     {id: 3, source: 1, target: 2},
 * ]
 */ 

graph.update({target: 1}, {source: 1}, (error, count) => {
  count; // 2
});
// Unlink handled
// Link handled

collection; 
/**
 * [
 *   {id: 1, source: 1, target: 1},
 *   {id: 2, source: 1, target: 1},
 *   {id: 3, source: 1, target: 2},
 * ]
 */ 
 
graph.update(2, {source: 2}, (error, count) => {
  count; // 1
});
// Unlink handled
// Link handled

collection; 
/**
 * [
 *   {id: 1, source: 1, target: 1},
 *   {id: 2, source: 2, target: 1},
 *   {id: 3, source: 1, target: 2},
 * ]
 */

graph.remove({source: 2}, (error, count) => {
  count; // 1
});
// Unlink handled

collection; 
/**
 * [
 *   {id: 1, source: 1, target: 1},
 *   {id: 3, source: 1, target: 2},
 * ]
 */ 

graph.remove(3, (error, count) => {
  count; // 1
});
// Unlink handled

collection; 
/**
 * [
 *   {id: 1, source: 1, target: 1},
 * ]
 */ 

lodash.filter(collection, graph.query({source: 1}));
/**
 * [
 *   {id: 3, source: 1, target: 2},
 * ]
 */ 

```

### Hypergraph

There is support for hypergraphs's links. This means that the value can be an array.

When searching for an array of uses nonstrict matching.

```js
graph.insert({ source: [1, 2, 3] });
graph.insert({ source: 2 });
graph.fetch({ source: [2] });
/**
 * [
 *   {id: 1, source: [1, 2, 3]},
 *   {id: 2, source: 2},
 * ]
 */ 
graph.fetch({ source: 2 });
/**
 * [
 *   {id: 1, source: [1, 2, 3]},
 *   {id: 2, source: 2},
 * ]
 */ 
```

There are also operators for working with arrays.

```js
graph.insert({ source: [1, 2, 3] });
graph.update({ source: 2 }, { source: { add: [4, 2], remove: 1, push: [3] } });
graph.fetch({ source: 2 });
/**
 * [
 *   {id: 1, source: [2, 3, 4, 3]},
 * ]
 */
```

## Sync and Async

All methods necessarily support asynchronous callback results. If the database and adapted graph class allows the results so the same returns in sync. However, the synchronous version of the code is only recommended with the full confidence of support.

## Tests

Tests can be started with comand `npm install ancient-graph && cd ./node_modules/ancient-graph && npm run compile && npm test`. For more information lern [src/tests/index.js](https://github.com/AncientSouls/Graph/blob/master/src/tests/index.js).

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

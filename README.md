# AncientGraph

[![npm version](https://badge.fury.io/js/ancient-graph.svg)](https://badge.fury.io/js/ancient-graph)

Graph methods and event handlers based on adapter.

## Install
```bash
npm install --save ancient-graph
```

## Example

```js
import { Graph } from 'ancient-graph/lib/object.js';

var collection = [];
var graph = new Graph(collection, { id: 'id', source: 'source', target: 'target' });

graph.on('link', (oldLink, newLink, context)  => {
  console.log('Link handled');
});

graph.on('unlink', (oldLink, newLink, context)  => {
  console.log('Unink handled');
});

graph.insert({id: 1, sourse: 1, target: 1}, (error, id) => {
  id; // 1
}); 
// Link handled

collection; 
/**
 * [
 *   {id: 1, sourse': 1, target: 1},
 * ]
 */

graph.insert({id: 2, sourse: 2, target: 1, someText: anotherOne}, (error, id) => {
  id; // 2
});
// Link handled
collection;
/**
 * [
 *   {id: 1, sourse: 1, target: 1},
     {id: 2, sourse: 2, target: 1},
 * ]
 */ 

graph.insert({id: 3, sourse: 1, target: 2}, (error, id) => {
  id; // 2
});
// Link handled

collection; 
/**
 * [
 *   {id: 1, sourse: 1, target: 1},
     {id: 2, sourse: 2, target: 1},
     {id: 3, sourse: 1, target: 2},
 * ]
 */ 

graph.update({target: 1}, {sourse: 1}, (error, count) => {
  count; // 2
});
// Unink handled
// Link handled

collection; 
/**
 * [
 *   {id: 1, sourse: 1, target: 1},
 *   {id: 2, sourse: 1, target: 1},
 *   {id: 3, sourse: 1, target: 2},
 * ]
 */ 
 
graph.update(2, {sourse: 2}, (error, count) => {
  count; // 1
});
// Unink handled
// Link handled

collection; 
/**
 * [
 *   {id: 1, sourse: 1, target: 1},
 *   {id: 2, sourse: 2, target: 1},
 *   {id: 3, sourse: 1, target: 2},
 * ]
 */

graph.remove({sourse: 2}, (error, count) => {
  count; // 1
});
// Unink handled

collection; 
/**
 * [
 *   {id: 2, sourse: 2, target: 1},
 *   {id: 3, sourse: 1, target: 2},
 * ]
 */ 

graph.remove(2, {sourse: 1}, (error, count) => {
  count; // 1
});
// Unink handled

collection; 
/**
 * [
 *   {id: 3, sourse: 1, target: 2},
 * ]
 */ 

lodash.filter(collection, graph.query({source: 1}));
/**
 * [
 *   {id: 3, sourse: 1, target: 2},
 * ]
 */ 

```

## Tests

Tests can be started with comand `npm run compile && npm test`. For more information lern [src/tests/index.js](https://github.com/AncientSouls/Graph/blob/master/src/tests/index.js).

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

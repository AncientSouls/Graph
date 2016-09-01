# Graph

Graph methods and event handlers based on adapter.

## Install
```bash
npm install --save ancient-graph
```

## Example

```js
import { Graph } from 'ancient-graph/lib/object.js';
import { Graph as ObjectGraph } from 'ancient-graph/lib/object.js';



var collection = [];
var graph = new ObjectGraph.Graph(collection, { id: 'id', source: 'source', target: 'target' });

console.log (graph instanceof ObjectGraph); // true

graph.on ('insert', function {console.log('it is event time! First insert done')});

graph.insert ({'id' : '1', 'sourse' : '1', 'target' : '1'}, function (error, id) {console.log('first insert, bro');}); 
console.log (collection); // [{'id' : '1', 'sourse' : '1', 'target' : 1}]

graph.insert ({'id' : '2', 'sourse' : '1', 'target' : '1', 'someText' : 'anotherOne'}, function (error, id) {console.log('second insert, bro');});
console.log (collection); // [{'id' : '1', 'sourse' : '1', 'target' : 1}, {'id' : 2, 'sourse' : '1', 'target' : '1'}]

graph.insert ({'id' : '3', 'sourse' : '1', 'target' : '2'}, function (error, id) {console.log('third insert, bro');});
console.log (collection); // [{'id' : '1', 'sourse' : '1', 'target' : 1}, {'id' : 2, 'sourse' : '1', 'target' : '1'}, {'id' : 3, 'sourse' : '1', 'target' : '2'}]

graph.on ('update', function (error, id) {console.log('it is event time again! Update me fully, baby')});

graph.update ({'id' : '1'}, {'sourse' : '2'}, function (error, id) {console.log('first update, bro');});
console.log (collection); // [{'id' : '1', 'sourse' : '2', 'target' : 1}, {'id' : 2}, {'id' : 3}]

graph.update ('2', {'sourse' : '1'}, function (error, id) {console.log('second update, bro');});
console.log (collection); // [{'id' : '1', 'sourse' : '2', 'target' : 1}, {'id' : 2, 'sourse' : '1', 'target' : '1'}, {'id' : 3, 'sourse' : '1', 'target' : '2'}]

graph.on ('remove', function (error, id) {console.log('it is time for new event! Remove, destroy')});

graph.remove ({'sourse' : '2'}, function (error, id) {console.log('first kill, bro');});
console.log (collection); // [{'id' : 2, 'sourse' : '1', 'target' : '1'}, {'id' : 3, 'sourse' : '1', 'target' : '2'}]

graph.remove ('2', {'sourse' : '1'}, function (error, id) {console.log('second update, bro');});
console.log (collection); // [{'id' : 3, 'sourse' : '1', 'target' : '2'}]

console.log (lodash.filter(collection, graph.query({ 'source': '1'}))); // [{'id' : 3, 'sourse' : '1', 'target' : '2'}]

```

## Tests

Tests can be started with comand `npm run compile && npm test`. For more information lern [src/tests/index.js](https://github.com/AncientSouls/Graph/blob/master/src/tests/index.js).

## License

The MIT License (MIT)
Copyright (c) 2016 Ivan S Glazunov <ivansglazunov@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyTest = EmptyTest;

var _chai = require('chai');

function EmptyTest(generateGraph, ids) {
  describe('Test empty links', function () {
    it('should insert and fetch links', function (done) {
      var graph = generateGraph();
      graph.insert({}, function (error, id1) {
        _chai.assert.ifError(error);
        graph.insert({}, function (error, id2) {
          _chai.assert.ifError(error);
          graph.insert({}, function (error, id3) {
            _chai.assert.ifError(error);
            graph.fetch({}, { sort: { id: false } }, function (error, links) {
              _chai.assert.lengthOf(links, 3);
              _chai.assert.deepEqual(links[0], { id: id1 });
              _chai.assert.deepEqual(links[1], { id: id2 });
              _chai.assert.deepEqual(links[2], { id: id3 });
              done();
            });
          });
        });
      });
    });
    it('should insert and update and fetch links', function (done) {
      var graph = generateGraph();
      graph.insert({}, function (error, id1) {
        graph.fetch(id1, undefined, function (error, links) {
          _chai.assert.lengthOf(links, 1);
          _chai.assert.deepEqual(links[0], { id: id1 });
          graph.update(id1, { source: ids[0] }, function (error, count) {
            _chai.assert.ifError(error);
            _chai.assert.equal(count, 1);
            graph.fetch({ target: undefined }, undefined, function (error, links) {
              _chai.assert.ifError(error);
              _chai.assert.lengthOf(links, 1);
              _chai.assert.deepEqual(links[0], { id: id1, source: ids[0] });
              graph.update({ target: undefined }, { target: ids[1] }, function (error, count) {
                _chai.assert.ifError(error);
                _chai.assert.equal(count, 1);
                graph.fetch({ target: ids[1], source: ids[0] }, undefined, function (error, links) {
                  _chai.assert.ifError(error);
                  _chai.assert.lengthOf(links, 1);
                  _chai.assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[1] });
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should remove links', function (done) {
      var graph = generateGraph();
      graph.insert({}, function (error, id1) {
        graph.insert({}, function (error, id2) {
          graph.insert({}, function (error, id3) {
            graph.remove(id1, function (error, removed) {
              _chai.assert.ifError(error);
              _chai.assert.equal(removed, 1);
              graph.remove({ source: undefined, target: undefined }, function (error, removed) {
                _chai.assert.ifError(error);
                _chai.assert.equal(removed, 2);
                graph.fetch({ source: undefined, target: undefined }, undefined, function (error, links) {
                  _chai.assert.ifError(error);
                  _chai.assert.lengthOf(links, 0);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
}
//# sourceMappingURL=empty.js.map
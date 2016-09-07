'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HyperTest = HyperTest;

var _chai = require('chai');

function HyperTest(generateGraph, ids) {
  describe('Test hyper links', function () {
    it('should insert and fetch links', function (done) {
      var graph = generateGraph();
      graph.insert({ source: [ids[0], ids[1]], target: [ids[0]] }, function (error, id1) {
        _chai.assert.ifError(error);
        graph.insert({ source: [ids[2]], target: [ids[1]] }, function (error, id2) {
          _chai.assert.ifError(error);
          graph.insert({ source: [ids[0]], target: [ids[1]] }, function (error, id3) {
            _chai.assert.ifError(error);
            graph.fetch({ source: ids[0] }, { sort: { id: false } }, function (error, links) {
              _chai.assert.lengthOf(links, 2);
              _chai.assert.deepEqual(links[0], { id: id1, source: [ids[0], ids[1]], target: [ids[0]] });
              _chai.assert.deepEqual(links[1], { id: id3, source: [ids[0]], target: [ids[1]] });
              done();
            });
          });
        });
      });
    });
    it('should insert and update and fetch links', function (done) {
      var graph = generateGraph();
      graph.insert({ source: [ids[0], ids[1], ids[2]], target: [ids[0]] }, function (error, id1) {
        graph.fetch(id1, undefined, function (error, links) {
          _chai.assert.lengthOf(links, 1);
          _chai.assert.deepEqual(links[0], { id: id1, source: [ids[0], ids[1], ids[2]], target: [ids[0]] });
          graph.update(id1, { source: [ids[0], ids[2]] }, function (error, count) {
            _chai.assert.ifError(error);
            _chai.assert.equal(count, 1);
            graph.fetch({ source: [ids[2]] }, undefined, function (error, links) {
              _chai.assert.ifError(error);
              _chai.assert.lengthOf(links, 1);
              _chai.assert.deepEqual(links[0], { id: id1, source: [ids[0], ids[2]], target: [ids[0]] });
              graph.update({ source: ids[2] }, { target: [ids[1]] }, function (error, count) {
                _chai.assert.ifError(error);
                _chai.assert.equal(count, 1);
                graph.fetch({ target: ids[1] }, undefined, function (error, links) {
                  _chai.assert.ifError(error);
                  _chai.assert.lengthOf(links, 1);
                  _chai.assert.deepEqual(links[0], { id: id1, source: [ids[0], ids[2]], target: [ids[1]] });
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
      graph.insert({ source: [ids[0], ids[1]] }, function (error, id1) {
        graph.insert({ source: [ids[1], ids[2]], target: [ids[2]] }, function (error, id2) {
          graph.insert({ source: ids[1] }, function (error, id3) {
            graph.remove(id1, function (error, removed) {
              _chai.assert.ifError(error);
              _chai.assert.equal(removed, 1);
              graph.remove({ source: ids[1], target: undefined }, function (error, removed) {
                _chai.assert.ifError(error);
                _chai.assert.equal(removed, 1);
                graph.fetch({ source: ids[1] }, undefined, function (error, links) {
                  _chai.assert.ifError(error);
                  _chai.assert.lengthOf(links, 1);
                  _chai.assert.deepEqual(links[0], { id: id2, source: [ids[1], ids[2]], target: [ids[2]] });
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
//# sourceMappingURL=hyper.js.map
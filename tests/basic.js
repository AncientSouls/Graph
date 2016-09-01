'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertUpdateRemoveFetchTest = InsertUpdateRemoveFetchTest;

var _chai = require('chai');

function InsertUpdateRemoveFetchTest(graph, ids) {
  describe('Basic insert, update, remove, fetch tests', function () {
    it('should insert and fetch complete links', function (done) {
      graph.insert({ source: ids[0], target: ids[0] }, function (error, id1) {
        _chai.assert.ifError(error);
        graph.insert({ source: ids[0], target: ids[0] }, function (error, id2) {
          _chai.assert.ifError(error);
          graph.insert({ source: ids[0], target: ids[0] }, function (error, id3) {
            _chai.assert.ifError(error);
            graph.fetch({ source: ids[0], target: ids[0] }, { sort: { id: false } }, function (error, links) {
              _chai.assert.lengthOf(links, 3);
              _chai.assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[0] });
              _chai.assert.deepEqual(links[1], { id: id2, source: ids[0], target: ids[0] });
              _chai.assert.deepEqual(links[2], { id: id3, source: ids[0], target: ids[0] });
              done();
            });
          });
        });
      });
    });
    it('should insert and fetch incomplete links', function (done) {
      graph.insert({ source: ids[1], target: ids[1] }, function (error, id1) {
        graph.insert({ source: ids[1] }, function (error, id2) {
          graph.insert({ target: ids[1] }, function (error, id3) {
            graph.fetch({ source: ids[1], target: undefined }, { sort: { id: false } }, function (error, links) {
              _chai.assert.lengthOf(links, 1);
              _chai.assert.deepEqual(links[0], { id: id2, source: ids[1] });
              done();
            });
          });
        });
      });
    });
    it('should insert and fetch empty links', function (done) {
      graph.insert({}, function (error, id1) {
        graph.insert({ source: ids[2] }, function (error, id2) {
          graph.insert({}, function (error, id3) {
            graph.fetch({ source: undefined, target: undefined }, { sort: { id: false } }, function (error, links) {
              _chai.assert.lengthOf(links, 2);
              _chai.assert.deepEqual(links[0], { id: id1 });
              _chai.assert.deepEqual(links[1], { id: id3 });
              done();
            });
          });
        });
      });
    });
    it('should update empty to incomplete to complete and fetch result', function (done) {
      graph.insert({}, function (error, id1) {
        graph.fetch(id1, undefined, function (error, links) {
          _chai.assert.lengthOf(links, 1);
          _chai.assert.deepEqual(links[0], { id: id1 });
          graph.update(id1, { source: ids[3] }, function (error, count) {
            _chai.assert.ifError(error);
            _chai.assert.equal(count, 1);
            graph.fetch({ source: ids[3] }, undefined, function (error, links) {
              _chai.assert.ifError(error);
              _chai.assert.lengthOf(links, 1);
              _chai.assert.deepEqual(links[0], { id: id1, source: ids[3] });
              graph.update({ source: ids[3] }, { target: ids[4] }, function (error, count) {
                _chai.assert.ifError(error);
                _chai.assert.equal(count, 1);
                graph.fetch({ target: ids[4] }, undefined, function (error, links) {
                  _chai.assert.ifError(error);
                  _chai.assert.lengthOf(links, 1);
                  _chai.assert.deepEqual(links[0], { id: id1, source: ids[3], target: ids[4] });
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should remove empty, incomplete and complete links', function (done) {
      graph.insert({}, function (error, id1) {
        graph.insert({ source: ids[5] }, function (error, id2) {
          graph.insert({ source: ids[5], target: ids[6] }, function (error, id3) {
            graph.remove(id1, function (error, removed) {
              _chai.assert.ifError(error);
              _chai.assert.equal(removed, 1);
              graph.remove({ source: ids[5] }, function (error, removed) {
                _chai.assert.ifError(error);
                _chai.assert.equal(removed, 2);
                graph.fetch({ source: ids[5] }, undefined, function (error, links) {
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
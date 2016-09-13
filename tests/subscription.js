'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionTest = SubscriptionTest;

var _chai = require('chai');

function SubscriptionTest(generateGraph, ids) {
  describe('Subscription tests', function () {
    it('should insert and check handler', function (done) {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', function (oldLink, newLink) {
        return emitted += 'link';
      });
      graph.on('unlink', function (oldLink, newLink) {
        return emitted += 'unlink';
      });
      graph.on('insert', function (oldLink, newLink) {
        return emitted += 'insert';
      });
      graph.on('update', function (oldLink, newLink) {
        return emitted += 'update';
      });
      graph.on('remove', function (oldLink, newLink) {
        return emitted += 'remove';
      });
      graph.insert({ source: ids[0], target: ids[0] }, function (error, id1) {
        _chai.assert.ifError(error);
        _chai.assert.equal(emitted, 'linkinsert');
        done();
      });
    });
    it('should update and check handler', function (done) {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', function (oldLink, newLink) {
        return emitted += 'link';
      });
      graph.on('unlink', function (oldLink, newLink) {
        return emitted += 'unlink';
      });
      graph.on('insert', function (oldLink, newLink) {
        return emitted += 'insert';
      });
      graph.on('update', function (oldLink, newLink) {
        return emitted += 'update';
      });
      graph.on('remove', function (oldLink, newLink) {
        return emitted += 'remove';
      });
      graph.insert({ source: ids[1], target: ids[1] }, function (error, id1) {
        _chai.assert.ifError(error);
        graph.update(id1, { target: ids[2] }, function (error, count) {
          _chai.assert.ifError(error);
          _chai.assert.equal(emitted, 'linkinsertlinkunlinkupdate');
          done();
        });
      });
    });
    it('should remove and check handler', function (done) {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', function (oldLink, newLink) {
        return emitted += 'link';
      });
      graph.on('unlink', function (oldLink, newLink) {
        return emitted += 'unlink';
      });
      graph.on('insert', function (oldLink, newLink) {
        return emitted += 'insert';
      });
      graph.on('update', function (oldLink, newLink) {
        return emitted += 'update';
      });
      graph.on('remove', function (oldLink, newLink) {
        return emitted += 'remove';
      });
      graph.insert({ source: ids[3], target: ids[3] }, function (error, id1) {
        _chai.assert.ifError(error);
        graph.remove(id1, function (error, count) {
          _chai.assert.ifError(error);
          _chai.assert.equal(emitted, 'linkinsertunlinkremove');
          done();
        });
      });
    });
  });
}
//# sourceMappingURL=subscription.js.map
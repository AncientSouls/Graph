'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionTest = SubscriptionTest;

var _chai = require('chai');

function SubscriptionTest(graph, ids) {
  var linked = 0,
      unlinked = 0,
      inserted = 0,
      updated = 0,
      removed = 0;
  it('should subscribe to link, unlink, inder, update, remove events', function () {
    graph.on('link', function (oldLink, newLink) {
      // console.log('link', oldLink, newLink);
      linked++;
    });
    graph.on('unlink', function (oldLink, newLink) {
      // console.log('unlink', oldLink, newLink);
      unlinked++;
    });
    graph.on('insert', function (oldLink, newLink) {
      // console.log('insert', oldLink, newLink);
      inserted++;
    });
    graph.on('update', function (oldLink, newLink) {
      // console.log('update', oldLink, newLink);
      updated++;
    });
    graph.on('remove', function (oldLink, newLink) {
      // console.log('remove', oldLink, newLink);
      removed++;
    });
  });
  it('should insert and check handler', function () {
    var insertedOld = inserted,
        linkedOld = linked;
    graph.insert({ source: ids[0], target: ids[0] }, function (error, id1) {
      _chai.assert.ifError(error);
      _chai.assert.equal(linked, linkedOld + 1);
      _chai.assert.equal(inserted, insertedOld + 1);
    });
  });
  it('should update and check handler', function (done) {
    var updatedOld, unlinkedOld, linkedOld;
    graph.insert({ source: ids[1], target: ids[1] }, function (error, id1) {
      _chai.assert.ifError(error);
      updatedOld = updated, unlinkedOld = unlinked, linkedOld = linked;
      graph.update(id1, { target: ids[2] }, function (error, count) {
        _chai.assert.equal(linked, linkedOld + 1);
        _chai.assert.equal(unlinked, unlinkedOld + 1);
        _chai.assert.equal(updated, updatedOld + 1);
        done();
      });
    });
  });
  it('should remove and check handler', function (done) {
    var removedOld, unlinkedOld;
    graph.insert({ source: ids[3], target: ids[3] }, function (error, id1) {
      _chai.assert.ifError(error);
      removedOld = removed, unlinkedOld = unlinked;
      graph.remove(id1, function (error, count) {
        _chai.assert.equal(removed, removedOld + 1);
        _chai.assert.equal(unlinked, unlinkedOld + 1);
        done();
      });
    });
  });
}
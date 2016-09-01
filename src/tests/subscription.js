import { assert } from 'chai';

export function SubscriptionTest (graph, ids) {
  var
    linked = 0,
    unlinked = 0,
    inserted = 0,
    updated = 0,
    removed = 0
  ;
  
  before(function() {
    linked = 0;
    unlinked = 0;
    inserted = 0;
    updated = 0;
    removed = 0;
  });
  
  describe('Subscription tests', function() {
    it('should subscribe to link, unlink, inder, update, remove events', () => {
      graph.on('link', (oldLink, newLink) => {
        // console.log('link', oldLink, newLink);
        linked++;
      });
      graph.on('unlink', (oldLink, newLink) => {
        // console.log('unlink', oldLink, newLink);
        unlinked++;
      });
      graph.on('insert', (oldLink, newLink) => {
        // console.log('insert', oldLink, newLink);
        inserted++;
      });
      graph.on('update', (oldLink, newLink) => {
        // console.log('update', oldLink, newLink);
        updated++;
      });
      graph.on('remove', (oldLink, newLink) => {
        // console.log('remove', oldLink, newLink);
        removed++;
      });
    });
    it('should insert and check handler', () => {
      var
        insertedOld = inserted,
        linkedOld = linked
      ;
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        assert.ifError(error);
        assert.equal(linked, linkedOld + 1);
        assert.equal(inserted, insertedOld + 1);
      });
    });
    it('should update and check handler', (done) => {
      var
        updatedOld,
        unlinkedOld,
        linkedOld
      ;
      graph.insert({ source: ids[1], target: ids[1] }, function(error, id1) {
        assert.ifError(error);
        updatedOld = updated,
        unlinkedOld = unlinked,
        linkedOld = linked;
        graph.update(id1, { target: ids[2] }, function(error, count) {
          assert.equal(linked, linkedOld + 1);
          assert.equal(unlinked, unlinkedOld + 1);
          assert.equal(updated, updatedOld + 1);
          done();
        });
      });
    });
    it('should remove and check handler', (done) => {
      var
        removedOld,
        unlinkedOld
      ;
      graph.insert({ source: ids[3], target: ids[3] }, function(error, id1) {
        assert.ifError(error);
        removedOld = removed,
        unlinkedOld = unlinked
        graph.remove(id1, function(error, count) {
          assert.equal(removed, removedOld + 1);
          assert.equal(unlinked, unlinkedOld + 1);
          done();
        });
      });
    });
  });
}
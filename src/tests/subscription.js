import { assert } from 'chai';

export function SubscriptionTest (generateGraph, ids) {
  describe('Subscription tests', function() {
    it('should insert and check handler', (done) => {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', (oldLink, newLink) => emitted+='link');
      graph.on('link', (oldLink, newLink) => emitted+='link')();
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink');
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink')();
      graph.on('insert', (oldLink, newLink) => emitted+='insert');
      graph.on('insert', (oldLink, newLink) => emitted+='insert')();
      graph.on('update', (oldLink, newLink) => emitted+='update');
      graph.on('update', (oldLink, newLink) => emitted+='update')();
      graph.on('remove', (oldLink, newLink) => emitted+='remove');
      graph.on('remove', (oldLink, newLink) => emitted+='remove')();
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        assert.ifError(error);
        assert.equal(emitted, 'linkinsert');
        done();
      });
    });
    it('should update and check handler', (done) => {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', (oldLink, newLink) => emitted+='link');
      graph.on('link', (oldLink, newLink) => emitted+='link')();
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink');
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink')();
      graph.on('insert', (oldLink, newLink) => emitted+='insert');
      graph.on('insert', (oldLink, newLink) => emitted+='insert')();
      graph.on('update', (oldLink, newLink) => emitted+='update');
      graph.on('update', (oldLink, newLink) => emitted+='update')();
      graph.on('remove', (oldLink, newLink) => emitted+='remove');
      graph.on('remove', (oldLink, newLink) => emitted+='remove')();
      graph.insert({ source: ids[1], target: ids[1] }, function(error, id1) {
        assert.ifError(error);
        graph.update(id1, { target: ids[2] }, function(error, count) {
          assert.ifError(error);
          assert.equal(emitted, 'linkinsertlinkunlinkupdate');
          done();
        });
      });
    });
    it('should remove and check handler', (done) => {
      var graph = generateGraph();
      var emitted = '';
      graph.on('link', (oldLink, newLink) => emitted+='link');
      graph.on('link', (oldLink, newLink) => emitted+='link')();
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink');
      graph.on('unlink', (oldLink, newLink) => emitted+='unlink')();
      graph.on('insert', (oldLink, newLink) => emitted+='insert');
      graph.on('insert', (oldLink, newLink) => emitted+='insert')();
      graph.on('update', (oldLink, newLink) => emitted+='update');
      graph.on('update', (oldLink, newLink) => emitted+='update')();
      graph.on('remove', (oldLink, newLink) => emitted+='remove');
      graph.on('remove', (oldLink, newLink) => emitted+='remove')();
      graph.insert({ source: ids[3], target: ids[3] }, function(error, id1) {
        assert.ifError(error);
        graph.remove(id1, function(error, count) {
          assert.ifError(error);
          assert.equal(emitted, 'linkinsertunlinkremove');
          done();
        });
      });
    });
  });
}
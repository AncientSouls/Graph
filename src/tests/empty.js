import { assert } from 'chai';

export function EmptyTest (generateGraph, ids) {
  describe('Test empty links', function() {
    it('should insert and fetch links', (done) => {
      var graph = generateGraph();
      graph.insert({}, (error, id1) => {
        assert.ifError(error);
        graph.insert({}, (error, id2) => {
          assert.ifError(error);
          graph.insert({}, (error, id3) => {
            assert.ifError(error);
            graph.fetch({}, { sort: { id: false } }, (error, links) => {
              assert.lengthOf(links, 3);
              assert.deepEqual(links[0], { id: id1 });
              assert.deepEqual(links[1], { id: id2 });
              assert.deepEqual(links[2], { id: id3 });
              done();
            });
          });
        });
      });
    });
    it('should insert and update and fetch links', (done) => {
      var graph = generateGraph();
      graph.insert({}, (error, id1) => {
        graph.fetch(id1, undefined, (error, links) => {
          assert.lengthOf(links, 1);
          assert.deepEqual(links[0], { id: id1 });
          graph.update(id1, { source: ids[0] }, (error, count) => {
            assert.ifError(error);
            assert.equal(count, 1);
            graph.fetch({ target: undefined }, undefined, (error, links) => {
              assert.ifError(error);
              assert.lengthOf(links, 1);
              assert.deepEqual(links[0], { id: id1, source: ids[0] });
              graph.update({ target: undefined }, { target: ids[1] }, (error, count) => {
                assert.ifError(error);
                assert.equal(count, 1);
                graph.fetch({ target: ids[1], source: ids[0] }, undefined, (error, links) => {
                  assert.ifError(error);
                  assert.lengthOf(links, 1);
                  assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[1] });
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should remove links', (done) => {
      var graph = generateGraph();
      graph.insert({}, (error, id1) => {
        graph.insert({}, (error, id2) => {
          graph.insert({}, (error, id3) => {
            graph.remove(id1, (error, removed) => {
              assert.ifError(error);
              assert.equal(removed, 1);
              graph.remove({ source: undefined, target: undefined }, (error, removed) => {
                assert.ifError(error);
                assert.equal(removed, 2);
                graph.fetch({ source: undefined, target: undefined }, undefined, (error, links) => {
                  assert.ifError(error);
                  assert.lengthOf(links, 0);
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
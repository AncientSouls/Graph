import { assert } from 'chai';

export function CompleteTest (generateGraph, ids) {
  describe('Test complete links', function() {
    it('should insert and fetch links', (done) => {
      var graph = generateGraph();
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        assert.ifError(error);
        graph.insert({ source: ids[0], target: ids[1] }, (error, id2) => {
          assert.ifError(error);
          graph.insert({ source: ids[0], target: ids[2] }, (error, id3) => {
            assert.ifError(error);
            graph.fetch({ source: ids[0] }, { sort: { id: false } }, (error, links) => {
              assert.lengthOf(links, 3);
              assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[0] });
              assert.deepEqual(links[1], { id: id2, source: ids[0], target: ids[1] });
              assert.deepEqual(links[2], { id: id3, source: ids[0], target: ids[2] });
              done();
            });
          });
        });
      });
    });
    it('should insert and update and fetch links', (done) => {
      var graph = generateGraph();
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        graph.fetch(id1, undefined, (error, links) => {
          assert.lengthOf(links, 1);
          assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[0] });
          graph.update(id1, { source: ids[1] }, (error, count) => {
            assert.ifError(error);
            assert.equal(count, 1);
            graph.fetch({ source: ids[1] }, undefined, (error, links) => {
              assert.ifError(error);
              assert.lengthOf(links, 1);
              assert.deepEqual(links[0], { id: id1, source: ids[1], target: ids[0] });
              graph.update({ source: ids[1] }, { target: ids[2] }, (error, count) => {
                assert.ifError(error);
                assert.equal(count, 1);
                graph.fetch({ target: ids[2] }, undefined, (error, links) => {
                  assert.ifError(error);
                  assert.lengthOf(links, 1);
                  assert.deepEqual(links[0], { id: id1, source: ids[1], target: ids[2] });
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
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        graph.insert({ source: ids[0], target: ids[1] }, (error, id2) => {
          graph.insert({ source: ids[0], target: ids[2] }, (error, id3) => {
            graph.remove(id1, (error, removed) => {
              assert.ifError(error);
              assert.equal(removed, 1);
              graph.remove({ source: ids[0] }, (error, removed) => {
                assert.ifError(error);
                assert.equal(removed, 2);
                graph.fetch({ source: ids[0] }, undefined, (error, links) => {
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
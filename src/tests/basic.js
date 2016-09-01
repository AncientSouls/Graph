import { assert } from 'chai';

export function InsertUpdateRemoveFetchTest (graph, ids) {
  describe('Basic insert, update, remove, fetch tests', function() {
    it('should insert and fetch complete links', (done) => {
      graph.insert({ source: ids[0], target: ids[0] }, (error, id1) => {
        assert.ifError(error);
        graph.insert({ source: ids[0], target: ids[0] }, (error, id2) => {
          assert.ifError(error);
          graph.insert({ source: ids[0], target: ids[0] }, (error, id3) => {
            assert.ifError(error);
            graph.fetch({ source: ids[0], target: ids[0] }, { sort: { id: false } }, (error, links) => {
              assert.lengthOf(links, 3);
              assert.deepEqual(links[0], { id: id1, source: ids[0], target: ids[0] });
              assert.deepEqual(links[1], { id: id2, source: ids[0], target: ids[0] });
              assert.deepEqual(links[2], { id: id3, source: ids[0], target: ids[0] });
              done();
            });
          });
        });
      });
    });
    it('should insert and fetch incomplete links', (done) => {
      graph.insert({ source: ids[1], target: ids[1] }, (error, id1) => {
        graph.insert({ source: ids[1] }, (error, id2) => {
          graph.insert({ target: ids[1] }, (error, id3) => {
            graph.fetch({ source: ids[1], target: undefined }, { sort: { id: false } }, (error, links) => {
              assert.lengthOf(links, 1);
              assert.deepEqual(links[0], { id: id2, source: ids[1] });
              done();
            });
          });
        });
      });
    });
    it('should insert and fetch empty links', (done) => {
      graph.insert({}, (error, id1) => {
        graph.insert({ source: ids[2] }, (error, id2) => {
          graph.insert({}, (error, id3) => {
            graph.fetch({ source: undefined, target: undefined }, { sort: { id: false } }, (error, links) => {
              assert.lengthOf(links, 2);
              assert.deepEqual(links[0], { id: id1 });
              assert.deepEqual(links[1], { id: id3 });
              done();
            });
          });
        });
      });
    });
    it('should update empty to incomplete to complete and fetch result', (done) => {
      graph.insert({}, (error, id1) => {
        graph.fetch(id1, undefined, (error, links) => {
          assert.lengthOf(links, 1);
          assert.deepEqual(links[0], { id: id1 });
          graph.update(id1, { source: ids[3] }, (error, count) => {
            assert.ifError(error);
            assert.equal(count, 1);
            graph.fetch({ source: ids[3] }, undefined, (error, links) => {
              assert.ifError(error);
              assert.lengthOf(links, 1);
              assert.deepEqual(links[0], { id: id1, source: ids[3] });
              graph.update({ source: ids[3] }, { target: ids[4] }, (error, count) => {
                assert.ifError(error);
                assert.equal(count, 1);
                graph.fetch({ target: ids[4] }, undefined, (error, links) => {
                  assert.ifError(error);
                  assert.lengthOf(links, 1);
                  assert.deepEqual(links[0], { id: id1, source: ids[3], target: ids[4] });
                  done();
                });
              });
            });
          });
        });
      });
    });
    it('should remove empty, incomplete and complete links', (done) => {
      graph.insert({}, (error, id1) => {
        graph.insert({ source: ids[5] }, (error, id2) => {
          graph.insert({ source: ids[5], target: ids[6] }, (error, id3) => {
            graph.remove(id1, (error, removed) => {
              assert.ifError(error);
              assert.equal(removed, 1);
              graph.remove({ source: ids[5] }, (error, removed) => {
                assert.ifError(error);
                assert.equal(removed, 2);
                graph.fetch({ source: ids[5] }, undefined, (error, links) => {
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
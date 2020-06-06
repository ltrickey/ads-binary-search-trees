/*jshint esversion: 6 */
import BinarySearchTree from './binary_search_tree';

const dataStructures = [
  BinarySearchTree,
  // We'll add more next week
];

dataStructures.forEach(TargetDS => {
  describe(TargetDS, () => {
    let bst;
    beforeEach(() => {
      bst = new TargetDS();
    });

    it('starts empty', () => {
      expect(bst.count()).toBe(0);
    });

    describe('lookup', () => {
      it('returns undefined on an empty tree', () => {
        expect(bst.lookup('test')).toBe(undefined);
      });

      it('returns undefined if the key is not in the tree', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach((key, i) => {
          bst.insert(key);
        });

        expect(bst.lookup('dne')).toBe(undefined);
      });

      it('finds the only record', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBeTruthy();
      });

      it('finds any extant record', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach(key => {
          bst.insert(key);
        });

        keys.forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });

        keys.reverse().forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });
      });

      it('returns the value associated with a record', () => {
        const records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];

        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });

        records.forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });

        records.reverse().forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });
      });
    });

    describe('insert', () => {
      it('increases count by 1', () => {
        expect(bst.count()).toBe(0);
        bst.insert(1);
        expect(bst.count()).toBe(1);

        const keys = [2, 3, 4, 5, 6];
        keys.forEach((key, i) => {
          bst.insert(key);
          expect(bst.count()).toBe(2 + i);
        });
      });

      it('replaces records with the same key and does not increase the count', () => {
        bst.insert('test', 'first value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('first value');

        bst.insert('test', 'second value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('second value');
      });

      it('uses true as the default value', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBe(true);
      });
    });

    describe('delete', () => {
      it('returns the value for the removed record', () => {
        bst.insert('test', 'first value');
        bst.insert('4', 'second value');
        bst.insert('6', 'second value');
        expect(bst.delete('test')).toBe('first value');
      });

      it('returns undefined if the record was not found', () => {
        bst.insert('test', 'first value');
        expect(bst.delete('not a test')).toBe(undefined);
      });

      it('reduces the count by 1', () => {
        bst.insert('1', 'first value');
        bst.insert('2', 'second value');
        bst.insert('4', 'second value');
        bst.insert('6', 'second value');

        let originalCount = bst.count();
        bst.delete('2');
        expect(bst.count()).toBe(originalCount - 1);
      });

      it('omits the removed record from iteration results', () => {
        bst.insert('1', 'first value');
        bst.insert('2', 'second value');
        bst.insert('3', 'third value');
        bst.insert('4', 'four value');

        bst.delete('1');

        expect(bst._root.key).toBe('2');
        bst.forEach((record, i) => {
          expect(record.key).not.toBe('1');
          expect(record.value).not.toBe('first value');
        });
      });

      // it('can remove every element in a tree', () => {
      //   bst.insert('1', 'first value');
      //   bst.insert('2', 'second value');
      //   bst.insert('3', 'third value');
      //   bst.insert('4', 'four value');
      //
      //   bst.delete('1');
      //   bst.delete('2');
      //   bst.delete('3');
      //   bst.delete('4');
      //
      //   expect(bst._root).toBeUndefined();
      //   expect(bst.count()).toBe(0);
      // });

      describe('scenarios', () => {
        // The first step for each of these tests will be to construct
        // a tree matching the scenario. How can you use your knowledge
        // of how insert works to do this? How can you check your work?

        it('can remove the record with the smallest key', () => {
          // TODO:
          // Insert several records
          // Remove the record with the smallest key
          // Ensure that looking up that key returns undefined

          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(30, 'third value');
          bst.insert(40, 'four value');

          bst.delete(4);
          expect(bst.lookup(4)).toBeUndefined();
        });

        it('can remove the record with the largest key', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(3000, 'third value');
          bst.insert(40, 'four value');

          bst.delete('3000');
          expect(bst.lookup('3000')).toBeUndefined();
        });

        it('can remove the root', () => {
          bst.insert(300, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(3000, 'third value');
          bst.insert(400, 'four value');

          bst.delete(bst._root);
          expect(bst.lookup(300)).toBeUndefined();
          expect(bst._root.key).toBe(400);
        });

        it('can remove a node with no children', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(40, 'fifth value');
          bst.insert(3000, 'sixth value');
          bst.insert(150, 'seventh value');

          bst.delete(4);
          expect(bst.lookup(4)).toBeUndefined();
        });

        it('can remove a node with only a left child', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(40, 'fifth value');
          bst.insert(3000, 'sixth value');
          bst.insert(150, 'seventh value');

          bst.delete(3000);
          expect(bst.lookup(3000)).toBeUndefined();
        });

        it('can remove a node with only a right child', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(40, 'fifth value');
          bst.insert(3000, 'sixth value');
          bst.insert(150, 'seventh value');
          bst.insert(45, 'seventh value');

          bst.delete(40);
          expect(bst.lookup(40)).toBeUndefined();
        });

        it('can remove a node with both children, where the successor is the node\'s right child', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(40, 'fifth value');
          bst.insert(3000, 'sixth value');
          bst.insert(45, 'seventh value');

          bst.delete(100);
          expect(bst._root.key).toBe(3000);
        });

        it('can remove a node with both children, where the successor is not the node\'s right child', () => {
          bst.insert(100, 'first value');
          bst.insert(20, 'second value');
          bst.insert(4, 'four value');
          bst.insert(40, 'fifth value');
          bst.insert(3000, 'sixth value');
          bst.insert(150, 'seventh value');
          bst.insert(45, 'seventh value');

          bst.delete(100);
          expect(bst._root.key).toBe(150);
        });
      });
    });

    describe('forEach', () => {
      let records;
      beforeEach(() => {
        records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];
      });

      const sortRecords = (records) => {
        return records.sort((a, b) => a.key.localeCompare(b.key));
      }

      const fill = (records) => {
        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });
      }

      it('runs the callback 0 times on an empty tree', () => {
        const cb = jest.fn();
        bst.forEach(cb);

        expect(cb.mock.calls.length).toBe(0);
      });

      it('provides {key, value}, index and tree as cb args', () => {
        bst.insert('key', 'value');

        const cb = jest.fn();
        bst.forEach(cb);

        const callArgs = cb.mock.calls[0];
        expect(callArgs[0].key).toBe('key');
        expect(callArgs[0].value).toBe('value');
        expect(callArgs[1]).toBe(0);
        expect(callArgs[2]).toBe(bst);
      });

      it('iterates records in key order', () => {
        fill(records);

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for sorted input', () => {
        fill(sortRecords(records));

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for reverse-sorted input', () => {
        fill(sortRecords(records).reverse());

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });
    });
  });
});

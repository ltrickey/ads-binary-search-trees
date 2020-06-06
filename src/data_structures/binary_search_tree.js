/*jshint esversion: 6 */

class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {

    //check if root is defined.
    if (this._root === undefined) {
      //create root node with key value, no parent and no l/r
      //I think I can delete this but leaving for now.
      const newRoot = new this.Node({key, value});
      this._root = newRoot;
      this._count += 1;
      return newRoot;
    }
    //root is def, set node as root
    let node = this._root;
    let parent = this._root;

    //check if key is greater than or less than root key.
    while (node && node.value !== undefined) {
      //if larger, go right
      if (key > node.key) {
        parent = node;
        node = node.right;
      //if smaller go left
      } else if (key < node.key) {
        parent = node;
        node = node.left;
      //if we find exact key, do not re-add.  No dupes.
    } else { //equal
        //replace with new value & return existing node to not add count.
        node.value = value;
        return node;
      }
    }

    //now we have parent, which is where we want to add the Node
    //create new child Node
    const childNode = new this.Node({key, value, parent});

    if (key > parent.key) {
      parent.right = childNode;
    } else if (key < parent.key) {
      parent.left = childNode;
    }  //dont set parent if key and parent key are equal b/c that means it is the parent.
    this._count += 1;
    return childNode;
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {

    const deleteRecursive = (node, key) => {
      console.log("CURRENT TREE STRUCTURE");
      this.forEach((record, i) => {
        console.log(`Record ${i}: ${record.key} -> ${record.value}`);
        console.log(`Record ${i} points to right:${record.right? record.right.key : 'undef'} left:${record.left? record.left.key : 'undef'}`);
      });
      //base case.  If node is empty or value not found, return.
      if (node === undefined) {
        return;
      }

      let successor;
      let toReturn;
      if (key < node.key) {
        deleteRecursive(node.left, key);
      } else if (key > node.key) {
        deleteRecursive(node.right, key);
      } else { //equal and we've found the value to delete
        toReturn = node.value;
        this._count -= 1;
        console.log("value found.  value to delete = " + node.value);

        //if deleting root node & count is 0,
        // deleting last value in tree so set root as undefined.
        if(node === this._root && this._count === 0) {
          console.log("deleting root and count 0");
          this._root = undefined;
        }

        console.log("here node is and values ==" + node.key + node.right + node.left + node.parent); //
        //find successor to replace deleted node
        if (node.left && node.right) {
          console.log("two children");

          //If node has 2 children, find the next in line successor aka left most node in right sub tree.
          successor = this.findMin(node.right);
          //delete pointer of successor's old parent.  Since it's the min will  always be the left child.
          successor.parent.left = undefined;
        } else {
          console.log("one or no children");
          //1 or no children, successor is direct left or right descendent or undefined
          if (node.left === undefined) {
            console.log("node.left is undef");
            successor = node.right;
            //this is where I'm getting an error/  Looks like it's not being assigned.  Something weird.  Do I need to keep track of parent through this???
          } else { //set as left or undefined.
            console.log("node.right is undef");
            successor = node.left;
          }
        }

        if (successor !== undefined) {
          console.log("here successor is and values ==" + successor.key + successor.value + successor.right + successor.left + successor.parent);
          //instead of reassigning pointers, just switch values.
          node.key = successor.key;
          node.value = successor.value;

          //we copied the value we wanted to the original node spot.
          //Now get rid of extra node by deleting parents' refs to it.
          if(successor.parent.left === successor) {
            console.log("lleft successor parent ==" + successor.parent.key);
            successor.parent.left = undefined;
          } else {
            console.log("right successor parent ==" + successor.parent.key);

            successor.parent.right = undefined;
          }
          successor.parent = undefined;
        } else { //no successor means just delete node.  To do this remove refs.
          if  (node.parent) {
            if (node.parent.left === node) {
              node.parent.left = undefined;
            } else {
              node.parent.right = undefined;
            }
            node.parent = undefined;
          }
        }

      return toReturn;
     }
   };

   return deleteRecursive(this._root, key);
  }

  findMin(node) {
    let minNode = node;
    while (minNode.left) {
        minNode = minNode.left;
    }
    return minNode;
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;

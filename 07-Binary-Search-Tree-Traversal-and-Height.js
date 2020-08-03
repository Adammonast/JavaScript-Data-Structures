// Initial Node class
// Represents every Node in the tree
// Takes three properties
class Node {
  constructor(data, left = null, right = null) {
    // The data we want to store
    this.data = data;
    // Points to the left nodes
    this.left = left;
    // Points to the right nodes
    this.right = right;
  }
}

// Binary Search Tree class
class BST {
  // Constructor function creates the root node
  // The top of the tree
  constructor() {
    // Starts as null
    this.root = null;
  }

  // Add function to add elements to the tree
  // Will be a recursive function
  // Pass in data argument
  add(data) {
    // Create a variable to reference the root node
    const node = this.root;
    // If this is the first node, node will automatically be null
    if (node === null) {
      // In that case, set the root to the new Node with our data passed into it
      this.root = new Node(data);
      // Return the newly created tree
      return;
      // If that's not the case, we have to figure out where to put the data within the tree
    } else {
      // Use a recursive function to find where to place the node
      // Pass in the node to the function, starts off as the root node
      const searchTree = function (node) {
        // If the data being passed is less than the data inside the node, put the data on the left side of the tree
        if (data < node.data) {
          // Check if the left side is null
          if (node.left === null) {
            // If not, assign node.left to the new Node
            node.left = new Node(data);
            return;
            // However, if the left is not null
          } else if (node.left !== null) {
            // Continue searching the tree
            // Recursion will start and keep running the search function until a spot for that node is found
            return searchTree(node.left);
          }
          // If the data being passed in is greater than the data inside the node, put the data on the right side of the tree
        } else if (data > node.data) {
          // Check if the right side is null
          if (node.right === null) {
            // If not, assign node.right to the new Node
            node.right = new Node(data);
            return;
            // However, if the right is not null
          } else if (node.right !== null) {
            // Continue searching the tree
            // Recursion will start and keep running the search function until a spot for that node is found
            return searchTree(node.right);
          }
          // If this point is reached, both the data being passed in and the data inside the node must be equal
        } else {
          // If the data is equal, we will NOT add the data to the tree
          // Just return null
          return null;
        }
      };
      // How we initially call the searchTree function
      // Node starts out as the root, but changes due to recursive calls
      return searchTree(node);
    }
  }

  // The minimum values will always be stored on the left side of a BST
  findMin() {
    // Set the current node to the root node
    let current = this.root;
    // Perform a while loop to check if the current left node is NOT null
    while (current.left !== null) {
      // While the left is not null, set the current node to the left node
      current = current.left;
    }
    // Return the most current data in the end
    return current.data;
  }

  // The maximum values will always be stored on the right side of a BST
  findMax() {
    // Set the current node to the root node
    let current = this.root;
    // Perform a while loop to check if the current right node is NOT null
    while (current.right !== null) {
      // While the right is not null, set the current node to the right node
      current = current.right;
    }
    // Return the most current data in the end
    return current.data;
  }

  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  // Returns true or false depending on if the data is in the tree
  // Pass in data argument
  isPresent(data) {
    // Starting at the top of the tree
    // Set current variable to the root node
    let current = this.root;
    // While there is a current node
    while (current) {
      // If the data being passed equals the current data, we found the node
      if (data === current.data) {
        // Return true because we have the node we're looking for
        return true;
      }
      // If we haven't found the node, check the data
      // If the data being passed is less than the current data (node)
      if (data < current.data) {
        // Set current to the left
        // Left side is for minimum values
        current = current.left;
      } else {
        // Else, the data being passed is greater and thus on the right side
        // Set current to the right
        current = current.right;
      }
    }
    // If we never find the node, that means it is not in the tree, return false
    return false;
  }

  // Remove function to delete elements from the tree
  // Will be a recursive function
  // Pass in data argument
  remove(data) {
    // Pass in the node and data we want to remove as arguments
    const removeNode = function (node, data) {
      // Check if the tree is empty
      if (node == null) {
        // If so, return null
        return null;
      }
      // Check if the data (node) being passed is already in the tree
      if (data == node.data) {
        // Three options on what to do next
        // Node has no children
        // Both left and right are empty
        if (node.left == null && node.right == null) {
          // Setting the reference to the node to null
          return null;
        }
        // Check if the node has ONE child (one or the other - left/right)
        // Node has no left child
        if (node.left == null) {
          // Replace the node with whatever node is on the right
          return node.right;
        }
        // Node has no right child
        if (node.right == null) {
          // Replace the node with whatever node is on the left
          return node.left;
        }
        // Node has two children
        // Temp node becomes the node on the right
        let tempNode = node.right;
        // While there is a left node
        while (tempNode.left !== null) {
          // Keep going down the left until there isn't a leftmost node anymore
          tempNode = tempNode.left;
        }
        // Set the current node to the temp node just created
        node.data = tempNode.data;
        // Recursively call removeNode passing in the right node and the temp node
        // The function will keep running and set up the right side of the tree correctly
        node.right = removeNode(node.right, tempNode.data);
        // Return the node
        return node;
        // Go to the left side of the tree --> data is less than the node
      } else if (data < node.data) {
        // Recursively call removeNode passing in the left node and the data
        // The function will keep running and set up the left side of the tree correctly
        node.left = removeNode(node.left, data);
        // Return the node
        return node;
        // If we reach this point, then the data is greater than node.data
      } else {
        // Recursively call removeNode passing in the right node once again and the data
        node.right = removeNode(node.right, data);
        // Return the node
        return node;
      }
    };
    // Assign the root to whatever value is returned from the removeNode function
    // Always pass in the root node as well as any data we are searching for (data variable)
    // Function gets called at the END of everything, however, recursion allows use for it earlier
    this.root = removeNode(this.root, data);
  }

  // Height in a tree represents the distance from the root node to the leaf node
  // Different paths in a highly branched tree structure may have different heights
  // For a given tree, there will be a minimum height/maximum height
  // If the tree is balanced, these values will differ at most by 1
  // The minimum height is the distance from the root node to the first leaf node without 2 children
  // The maximum height is the distance from the root node to the most bottom node

  // Tree traversal methods can be used to explore tree data structures and find all the values in the tree
  // In depth first search a given subtree is explored as deeply as possible before the search continues on another subtree
  // There are three ways this search can be done: in order, pre order, and post order
  // In-order traversal: Begin the search at the leftmost node and end at the right most node
  // Pre-order traversal: Explore the root nodes before the leaves
  // Post-order traversal: Explores the leaf nodes before the roots
  // Level order (also known as Breadth-First Search): Explores all the nodes in a given level within a tree before continuing to the next level

  // Check is tree is balanced (makes traversal easier)
  isBalanced() {
    // Call function findMinHeight and check if they are more than or equal to findMaxHeight
    // Returns true or false
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  // Recursive function
  // Can optionally pass node, but if not the node will get set to the root anyway
  findMinHeight(node = this.root) {
    // Check if the node is null
    if (node == null) {
      // If nothing has been added, the value of the tree will be -1 because its empty!
      return -1;
    }
    // Recursively call findMinHeight to keep checking the values of left and right
    // Eventually, one of them will be -1 because there won't be a left/right child node
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    // If left is less than right
    if (left < right) {
      // Add 1 to the left
      return left + 1;
      // Right is greater than left
    } else {
      // Add 1 to the right
      return right + 1;
    }
  }

  // Recursive function
  // Can optionally pass node, but if not the node will get set to the root anyway
  // Opposite to findMinHeight
  findMaxHeight(node = this.root) {
    // Check if the node is null
    if (node == null) {
      // If nothing has been added, the value of the tree will be -1 because its empty!
      return -1;
    }
    // Recursively call findMinHeight to keep checking the values of left and right
    // Eventually, one of them will be null because there won't be a child node
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    // If left is greater than right
    if (left > right) {
      // Add 1 to the left
      return left + 1;
    } else {
      // Add 1 to the right
      return right + 1;
    }
  }

  // In-order traversal: Begin the search at the leftmost node and end at the right most node
  inOrder() {
    // Check if the root node is null
    if (this.root == null) {
      // If null, tree is empty or has no values return null
      return null;
      // If there is a BST or one has values move on
    } else {
      // Initialize a new array using the built-in array method and set it to a result variable
      // This array will contain all the values from the tree we find
      let result = new Array();
      // Recursive function to find the tree nodes
      function traverseInOrder(node) {
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.left exists, run the traverseInOrder function on node.left
        node.left && traverseInOrder(node.left);
        // Push (add) the value of that node to the results array
        result.push(node.data);
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.right exists, run the traverseInOrder function on node.right
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    }
  }

  // Pre-order traversal: Explore the root nodes before the leaves
  preOrder() {
    // Check if the root node is null
    if (this.root == null) {
      // If null, tree is empty or has no values return null
      return null;
      // If there is a BST or one has values move on
    } else {
      // Initialize a new array using the built-in array method and set it to a result variable
      // This array will contain all the values from the tree we find
      let result = new Array();
      // Recursive function to find the tree nodes
      function traversePreOrder(node) {
        // Push (add) the value of that node to the results array
        result.push(node.data);
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.left exists, run the traverseInOrder function on node.left
        node.left && traversePreOrder(node.left);
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.right exists, run the traverseInOrder function on node.right
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    }
  }

  postOrder() {
    // Check if the root node is null
    if (this.root == null) {
      // If null, tree is empty or has no values return null
      return null;
      // If there is a BST or one has values move on
    } else {
      // Initialize a new array using the built-in array method and set it to a result variable
      // This array will contain all the values from the tree we find
      let result = new Array();
      // Recursive function to find the tree nodes
      function traversePreOrder(node) {
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.left exists, run the traverseInOrder function on node.left
        node.left && traversePreOrder(node.left);
        // Short circuit evaluation (if the left condition is true, the right statement will execute)
        // If node.right exists, run the traverseInOrder function on node.right
        node.right && traversePreOrder(node.right);
        // Push (add) the value of that node to the results array
        result.push(node.data);
      }
      traversePreOrder(this.root);
      return result;
    }
  }

  // Explores all the nodes in a given level within a tree before continuing to the next level
  levelOrder() {
    // Create a result array that will eventually be returned
    let result = [];
    // Queue array, temporarily used until the contents get put into the results array
    let queue = [];
    // Check if there is a BST or if one has nodes
    if (this.root != null) {
      // Push (add) the root node to the queue
      queue.push(this.root);
      // Keep iterating over the queue until it is empty
      while (queue.length > 0) {
        // Set the root node to a new variable to be removed from the queue
        // Shift takes off the first element of the queue and returns it
        let node = queue.shift();
        // Push (add) the shifted node into the results array
        result.push(node.data);
        // Check if the left side of the tree has nodes
        if (node.left != null) {
          // Push those nodes to the queue
          queue.push(node.left);
        }
        // Check if the right side of the tree has nodes
        if (node.right != null) {
          // Push those nodes to the queue
          queue.push(node.right);
        }
        // ***Remember: Because of the while loop, this process repeats itself until the queue is empty
        // The queue will shift the first element in the iteration and push it to the results array every iteration
      }
      // Return the results array
      return result;
      // if the root node is already in the tree, return null
    } else {
      return null;
    }
  }
}

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());

// Tree Traversal
console.log(`In Order: ${bst.inOrder()}`);
console.log(`Pre Order: ${bst.preOrder()}`);
console.log(`Post Order: ${bst.postOrder()}`);
console.log(`Level Order: ${bst.levelOrder()}`);

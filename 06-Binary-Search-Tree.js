// A tree is a data structure that holds data. When visualized, it resembles a tree!
// All data points in a tree are called nodes
// The top is called the root or parent node
// Node with branches leading to other nodes are refered to as the parent nodes
// Any children of nodes are parents of their own subtree
// Leaf nodes are nodes at the end of the tree with no children nodes

// *** A BINARY SEARCH TREE CAN ONLY HAVE TWO BRANCHES FOR EVERY NODE
// *** BINARY SEARCH TREES ARE ORDERED, EACH SUBTREE IS LESS THAN OR EQUAL TO THE PARENT NODE
// *** AND EACH RIGHT SUBTREE IS GREATER THAN OR EQUAL TO THE PARENT NODE
// Because BST use the principal of binary search, on average operations are able to skip about half of the tree
// This means that every method: lookup, insert, or delete takes time proportional to the logirithm of the number of items stored in the tree
// Slower than Hash Tables

// Use Classes to create the BST

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
}

const bst = new BST();

bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);
console.log(bst.findMin());
console.log(bst.findMax());
bst.remove(7);
console.log(bst.findMax());
console.log(bst.isPresent(4));

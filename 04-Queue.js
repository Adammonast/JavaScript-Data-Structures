// Create a queue
// Similar to Stacks except it follows First In First Out structure ---> FIFO

function Queue() {
  // Initialize queue to an empty array
  collection = [];

  // Helper function to print the contents of the queue
  this.print = function () {
    console.log(collection);
  };

  // Enqueue method push the first item onto the queue
  this.enqueue = function (element) {
    // Calls array push method
    collection.push(element);
  };

  // Dequeue method removes (pops) the first item off the queue
  this.dequeue = function () {
    // Calls array shift method
    // Removes first item and returns it
    return collection.shift();
  };

  // Front method returns the first item within the queue
  // Does NOT remove the item
  this.front = function () {
    // Return the first element index
    return collection[0];
  };

  // Size returns the length of the queue
  this.size = function () {
    // Use length method, pretty straight forward
    return collection.length;
  };

  // isEmpty checks if the queue is empty
  this.isEmpty = function () {
    // Returns true/false depending on if the contents equal 0 (empty)
    return collection.length === 0;
  };
}

let queue = new Queue();
queue.enqueue("a");
queue.enqueue("b");
queue.enqueue("c");
queue.print();
queue.dequeue();
console.log(queue.front());
queue.print();

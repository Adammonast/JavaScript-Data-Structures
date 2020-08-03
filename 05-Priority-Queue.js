// Create a priority Queue
// With priority queues, you pass in the element as well as the priority of the element
// If all the priorities are the same number, it's going to behave like a regular queue
// Elements passed in with a higher priority are sent to the beginning of the queue

function PriorityQueue() {
  // Initialize queue to an empty array
  let collection = [];

  // Helper function to print the queue
  this.printCollection = function () {
    console.log(collection);
  };

  // Enqueue function to push elements to the start of the queue
  this.enqueue = function (element) {
    // Check if the queue is empty first
    // Call isEmpty function to verify
    if (this.isEmpty()) {
      // If it is, push the element to the top of the queue
      collection.push(element);
      // If not, check the priorities to see where to put the element
    } else {
      // Variable to see if the element is added already, starts at false (duh!)
      let added = false;
      // Iterate over each of the elements in the queue to check the prorities
      for (let i = 0; i < collection.length; i++) {
        // checking priorities
        // Index[0] is the actual element we want to pass in, index[1] is the priority of the element
        // Is the priority of the element being passed in less than the priority of the element in the queue already?
        // [i] checks the indexes from elements in the queue
        // [1] checks the priorities from elements in the queue
        if (element[1] < collection[i][1]) {
          // If the priority is less than the element, add that element to the queue with splice
          collection.splice(i, 0, element);
          // Added gets changed to true
          added = true;
          // Break out of the loop
          break;
        }
      }
      // If the element hasn't already been added, add it to the queue now
      if (!added) {
        collection.push(element);
      }
    }
  };

  // Dequeue method removes (pops) the first item off the queue
  this.dequeue = function () {
    // Calls array shift method
    let value = collection.shift();
    // Removes first item and returns it
    return value[0];
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

let prQueue = new PriorityQueue();
prQueue.enqueue(["Adam", 2]);
prQueue.enqueue(["Hayley", 3]);
prQueue.enqueue(["Nikki", 1]);
prQueue.printCollection();
prQueue.dequeue();
prQueue.front();
prQueue.printCollection();

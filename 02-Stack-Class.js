// Create a Stack using a constructor function
let Stack = function () {
  // keeps track of how many items are in the stack
  this.count = 0;
  // initialize storage to an empty object
  this.storage = {};

  // Adds a value onto the end of the stack
  this.push = function (value) {
    this.storage[this.count] = value;
    this.count++;
  };

  // Removes and returns a value at the end of the stack
  this.pop = function () {
    // Check if the stack is empty
    // If count is 0, then there are no items within the stack
    if (this.count === 0) {
      return undefined;
    }
    // Decrement count because an item is being removed
    this.count--;
    // Create a result variable and set it to the storage count
    // this.storage is the object for our storage
    // this.count is the last item in the stack
    let result = this.storage[this.count];
    // Remove the item from the storage
    delete this.storage[this.count];
    // Return the new result, returns the last item
    return result;
  };

  this.size = function () {
    // this.count is the number of items within the stack
    return this.count;
  };

  // Returns the value at the end of the stack
  // Does NOT remove it like pop()
  this.peek = function () {
    return this.storage[this.count - 1];
  };
};

let myStack = new Stack();

myStack.push(1);
myStack.push(2);
console.log("Peek: ", myStack.peek());
console.log("Pop: ", myStack.pop());
console.log("Peek: ", myStack.peek());
myStack.push("Adam is the best at data structures!");
console.log("Size: ", myStack.size());
console.log("Peek: ", myStack.peek());
console.log("Pop: ", myStack.pop());
console.log("Peek: ", myStack.peek());

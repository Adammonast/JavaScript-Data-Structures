// Hash Tables are used to implement associative arrays or mappings of key/value pairs
// Common way to implement map data structure or objects
// Widely used because of how effcient they are
// The average time for lookup is NOT tied to the number of elemets stored in the table
// Average time complexity for hash tables is O(1) ---> search, insert, and delete
// Hash Tables take a key input and then runs it through a hash function
// A hash function maps strings to numbers, usually the numbers correspond to indexes in an array
// Hash functions need to be consistent so when you run a key through a hash function, it always gives the same number and it should map different words to different numbers
// If two words get hashed to the same number, this is called a collision
// One way to handle collisions is to store both key/value pairs at an index, then upon lookup of either, iterate through the "bucket" of items to find the key
// Items get stored in the array index and the "bucket" contains all the information stored
// The numerical value from the hash function is then used as the index to store the information
// If you try to access the same key again, the hashing function will process the key and return the same numerical result, which will then be used to look up the associated value
// Meaning: once you store everything in the array and once you want to get the number again, you would just pass in the key to the hash function. It will give you the exact same array index and get the information returned to you

// Hash function
// Pass in the string you want to hash
// Max is for the max number of buckets we're using in our hash table to store values
let hash = (string, max) => {
  // Begin hash at 0
  let hash = 0;
  // Iterate over every character in the string
  for (let i = 0; i < string.length; i++) {
    // Every character has a numerical value associated with it
    // Add every character from the string and store it in the hash variable
    hash += string.charCodeAt(i);
  }
  // Divide (modulo) the hashed value by the number of buckets
  // Return the remainder
  return hash % max;
};

let HashTable = function () {
  // Storage array is where we're storing all the data for the hash table
  let storage = [];
  // Number of buckets within the array
  const storageLimit = 14;

  // Utility function for the example
  // Prints the items in the array
  this.print = function () {
    console.log(storage);
  };

  // Add to the hash table
  // Pass in a key/value
  this.add = function (key, value) {
    // Figure out the index of the array by running it through the hash function
    // Pass in the and storageLimit to be hashed
    let index = hash(key, storageLimit);
    // Check if there is anything at the index in storage
    if (storage[index] === undefined) {
      // If not, set the index to that key/value pair
      storage[index] = [[key, value]];
      // If there's already a value (already a value in the bucket)
    } else {
      // Set inserted to false
      let inserted = false;
      // Iterate over each index to see if the key already exists
      for (let i = 0; i < storage[index].length; i++) {
        // Check if the key already exists
        if (storage[index][i][0] === key) {
          // Set that index to be the new value
          storage[index][i][1] = value;
          // Inserted will then become true
          inserted = true;
        }
      }
      // If the key does NOT exist, inserted will still equal false
      if (inserted === false) {
        // Push (add) in the new item
        // This is where we will get multiple entries into one bucket
        storage[index].push([key, value]);
      }
    }
  };

  // Remove from the hash table
  // Pass in the key of what we want to remove
  this.remove = function (key) {
    // Look up the index by passing it into the hash function
    let index = hash(key, storageLimit);
    // Check the storage index and the value of the key
    // If the storage index is 1, there is only one item in the bucket
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      // Delete that index or item
      delete storage[index];
      // If the storage index is not 1, there's a few items sharing the index in the hash table
      // We only want to delete the specific item associated with the key
    } else {
      // Iterate over each item in the index (bucket)
      for (let i = 0; i < storage[index].length; i++) {
        // Check if the key is equal to the key being passed in
        // 0 index is the key
        if (storage[index][i][0] === key) {
          // If so, delete that item!
          delete storage[index][i];
        }
      }
    }
  };

  // Function for looking up items in the hash table
  this.lookUp = function (key) {
    // Set the index using the hash function, passing the key and storage limit
    let index = hash(key, storageLimit);
    // Check for an undefined key
    if (storage[index] === undefined) {
      // If so, there's no value in the bucket, return undefined
      return undefined;
    } else {
      // Iterate over each item in the bucket
      for (let i = 0; i < storage[index].length; i++) {
        // If the item equals the key
        if (storage[index][i][0] === key) {
          // 1 index is the value
          // Return the item!
          return storage[index][i][1];
        }
      }
    }
  };
};

// Hash Function
// Everytime this gets runs with "adam" ---> 3 will always get returned
console.log(hash("adam", 10));
console.log(hash("adam", 10));
console.log(hash("adam", 10));
// Everytime this gets runs with "hayley" ---> 2 will always get returned
console.log(hash("hayley", 10));
console.log(hash("hayley", 10));
console.log(hash("hayley", 10));

// Hash Table - Increase bucket limit to prevent collisions!
let ht = new HashTable();
ht.add("adam", "person");
ht.add("lancelot", "cat");
ht.add("excalibur", "sword");
ht.add("merlin", "wizard");
console.log(ht.lookUp("lancelot"));
ht.print();
